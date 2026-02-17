import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { createContactMessage, getContactMessages, createPageView, getPageViewStats } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        subject: z.string().min(1),
        message: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        try {
          await createContactMessage({
            name: input.name,
            email: input.email,
            subject: input.subject,
            message: input.message,
          });

          // Notify owner about new contact message
          await notifyOwner({
            title: `New Contact Message from ${input.name}`,
            content: `Email: ${input.email}\nSubject: ${input.subject}\n\nMessage:\n${input.message}`,
          });

          return { success: true };
        } catch (error) {
          console.error("Failed to submit contact message:", error);
          return { success: false, error: "Failed to submit message" };
        }
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return await getContactMessages();
    }),
  }),

  analytics: router({
    trackPageView: publicProcedure
      .input(z.object({
        page: z.string(),
        userAgent: z.string().optional(),
        referrer: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          await createPageView({
            page: input.page,
            userAgent: input.userAgent,
            referrer: input.referrer,
          });
          return { success: true };
        } catch (error) {
          console.error("Failed to track page view:", error);
          return { success: false };
        }
      }),

    getStats: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return await getPageViewStats();
    }),
  }),
});

export type AppRouter = typeof appRouter;
