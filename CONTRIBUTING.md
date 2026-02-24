# Contributing to Anisur Rahman Farazi's Portfolio

Thank you for your interest in contributing to this portfolio project! This document provides guidelines and instructions for contributing. Whether you're fixing bugs, adding features, or improving documentation, your contributions are valuable and appreciated.

## 🎯 Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful, constructive, and professional in all interactions. Harassment, discrimination, or any form of inappropriate behavior will not be tolerated.

## 🤔 How Can I Contribute?

There are many ways to contribute to this project:

### Reporting Bugs

If you find a bug, please create an issue with the following information:

- **Clear title**: Describe the bug in a few words
- **Description**: Explain what the bug is and how to reproduce it
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable, include screenshots
- **Environment**: Your OS, browser, Node.js version, etc.

### Suggesting Enhancements

Have an idea for a new feature? We'd love to hear it! Please create an issue with:

- **Clear title**: Describe the enhancement
- **Description**: Explain the feature and why it would be useful
- **Examples**: Show how the feature would work
- **Additional context**: Any other relevant information

### Improving Documentation

Documentation improvements are always welcome! You can:

- Fix typos or unclear explanations
- Add examples or clarifications
- Improve the README or other documentation files
- Add comments to complex code sections

### Writing Code

Want to contribute code? Here's how to get started:

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Write tests for new functionality
5. Submit a pull request

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm package manager
- Git
- MySQL (for local development)

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/anisur-portfolio.git
   cd anisur-portfolio
   ```

3. **Add upstream remote** (to keep your fork updated):
   ```bash
   git remote add upstream https://github.com/anisurrahmanfarazi17/anisur-portfolio.git
   ```

4. **Install dependencies**:
   ```bash
   pnpm install
   ```

5. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your local database credentials
   ```

6. **Set up the database**:
   ```bash
   pnpm db:push
   ```

7. **Start the development server**:
   ```bash
   pnpm dev
   ```

## 📝 Development Workflow

### Creating a Feature Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/description` - for new features
- `fix/description` - for bug fixes
- `docs/description` - for documentation
- `refactor/description` - for code refactoring
- `test/description` - for adding tests

### Making Changes

1. Make your changes in the appropriate files
2. Keep commits atomic and focused
3. Write clear commit messages
4. Test your changes locally

### Commit Message Guidelines

Write clear, descriptive commit messages:

```
feat: add contact form validation

- Add email validation
- Add required field validation
- Show error messages to users

Fixes #123
```

Format:
- **Type**: feat, fix, docs, style, refactor, test, chore
- **Scope**: optional, e.g., (contact-form)
- **Subject**: brief description, lowercase, no period
- **Body**: detailed explanation (optional)
- **Footer**: reference issues, e.g., Fixes #123

### Code Style

This project uses Prettier for code formatting and ESLint for linting. Before committing:

```bash
pnpm format
```

### Testing

For new features or bug fixes, please add tests:

```bash
pnpm test
```

Run tests before submitting a pull request to ensure nothing breaks.

## 🔍 Pull Request Process

### Before Submitting

1. **Update your branch** with the latest upstream changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests**:
   ```bash
   pnpm test
   ```

3. **Build the project**:
   ```bash
   pnpm build
   ```

4. **Check for linting errors**:
   ```bash
   pnpm format
   ```

### Creating a Pull Request

1. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a pull request** on GitHub with:
   - Clear title describing the changes
   - Description of what was changed and why
   - Reference to related issues (e.g., Fixes #123)
   - Screenshots if applicable

3. **Pull Request Template**:
   ```markdown
   ## Description
   Brief description of the changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Refactoring

   ## Related Issues
   Fixes #123

   ## Testing
   Describe how you tested the changes

   ## Screenshots
   If applicable, add screenshots

   ## Checklist
   - [ ] My code follows the style guidelines
   - [ ] I have performed a self-review
   - [ ] I have commented complex code
   - [ ] I have updated documentation
   - [ ] My changes generate no new warnings
   - [ ] I have added tests
   - [ ] New and existing tests pass
   ```

## 📁 Project Structure

Understanding the project structure helps when contributing:

```
anisur-portfolio/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable UI components
│   │   ├── lib/           # Utilities and helpers
│   │   ├── App.tsx        # Main app component
│   │   └── index.css      # Global styles
│   └── index.html         # HTML template
├── server/                # Backend Express server
│   ├── routers.ts         # API endpoints
│   ├── db.ts              # Database queries
│   └── _core/             # Core server functionality
├── drizzle/               # Database schema
│   └── schema.ts          # Table definitions
├── CONTRIBUTING.md        # This file
├── LICENSE                # MIT License
├── README.md              # Project documentation
└── package.json           # Dependencies
```

## 🎨 Frontend Development

### Adding a New Page

1. Create a new file in `client/src/pages/YourPage.tsx`
2. Create a React component
3. Add the route in `client/src/App.tsx`
4. Use existing components from `client/src/components/`

### Adding a New Component

1. Create a new file in `client/src/components/YourComponent.tsx`
2. Use Tailwind CSS for styling
3. Use shadcn/ui components for consistency
4. Export the component

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the existing color scheme
- Maintain responsive design (mobile-first)
- Use the design tokens defined in `client/src/index.css`

## 🔧 Backend Development

### Adding a New API Endpoint

1. Add a new procedure in `server/routers.ts`
2. Define input validation with Zod
3. Add database query in `server/db.ts` if needed
4. Update the database schema in `drizzle/schema.ts` if needed
5. Run `pnpm db:push` to apply migrations

### Database Changes

1. Update `drizzle/schema.ts`
2. Run `pnpm db:push` to generate migrations
3. Test the migration locally
4. Commit both schema and migration files

## 🧪 Testing

### Running Tests

```bash
pnpm test
```

### Writing Tests

Tests should be placed next to the code they test with a `.test.ts` extension:

```
server/
├── routers.ts
├── routers.test.ts
└── db.ts
```

Example test structure:

```typescript
import { describe, it, expect } from "vitest";

describe("Feature Name", () => {
  it("should do something", () => {
    // Arrange
    const input = "test";
    
    // Act
    const result = myFunction(input);
    
    // Assert
    expect(result).toBe("expected");
  });
});
```

## 📚 Documentation

### Updating README

If your changes affect how to use the project, update the README.md accordingly.

### Adding Code Comments

- Comment complex logic
- Explain the "why", not the "what"
- Keep comments up-to-date with code changes
- Use JSDoc for functions

Example:

```typescript
/**
 * Validates email format
 * @param email - Email address to validate
 * @returns true if valid, false otherwise
 */
function isValidEmail(email: string): boolean {
  // Implementation
}
```

## 🔐 Security

If you discover a security vulnerability, please email anisurrahmanfarazi@gmail.com instead of using the issue tracker. Do not publicly disclose the vulnerability until it has been addressed.

## 📋 Review Process

1. A maintainer will review your pull request
2. Changes may be requested
3. Once approved, your PR will be merged
4. Your contribution will be acknowledged

## 🎓 Learning Resources

If you're new to any of the technologies used:

- **React**: [React Documentation](https://react.dev/)
- **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- **Tailwind CSS**: [Tailwind Documentation](https://tailwindcss.com/docs)
- **Express**: [Express Guide](https://expressjs.com/)
- **tRPC**: [tRPC Documentation](https://trpc.io/)
- **Git**: [Git Documentation](https://git-scm.com/doc)

## ❓ Questions?

If you have questions about contributing:

1. Check the README.md for general information
2. Review existing issues and pull requests
3. Create a new discussion or issue
4. Reach out via email: anisurrahmanfarazi@gmail.com

## 🙏 Thank You!

Thank you for contributing to this project! Your efforts help make this portfolio better for everyone. Whether it's code, documentation, bug reports, or feature suggestions, every contribution matters.

---

**Happy Contributing! 🚀**
