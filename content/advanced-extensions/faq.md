# FAQ & troubleshooting

## FAQ
### Who is responsible for Extensions?
Akeneo is responsible for the Extensions framework itself, including the APIs and administrative interface. We provide support for these components. Your organization or your integrator is responsible for any custom code, iframes, or other custom development built within the Extensions. Support for this custom code falls to your organization or integrator, not Akeneo.

### How can I add a new Extension to my PIM?
Adding a new extension to your organization is easy! Just follow the steps in [this guide](https://api.akeneo.com/extensions/getting-started.html#getting-started).

### The Extensions entry isn't showing up in my PIM. Could you help me understand why?
If you don't see the Extensions entry in your PIM, it's likely due to permission settings. [This guide](https://help.akeneo.com/extensions/ui-extentions#permissions) will help you check and activate the necessary permissions.

### I'd like to see my extension in a position that isn't currently available. What can I do?
Currently, Extension placements are limited to those defined by Akeneo. However, we highly value your feedback! Please contact your Customer Success Manager or our Support team to share your specific placement needs. This will help us understand your use case and consider it for future development.

## Troubleshooting
### SES_UNCAUGHT_EXCEPTION: TypeError: Cannot assign to read only property 'constructor' of object '[object Object]'

**What this error means:**

This error occurs when your code (or a library you're using) attempts to modify a property that is protected and cannot be changed.

**Common causes:**

- **Your code is trying to reassign `constructor`**
  - Check if you're directly assigning to `.constructor` anywhere in your code
  - Look for patterns like `obj.constructor = ...` or `prototype.constructor = ...`

- **A library you're using has compatibility issues**
  - Some older libraries may try to modify built-in objects in ways that aren't allowed in secure environments
  - Check if the error occurs after importing a specific library
  - Try updating the library to the latest version

- **Attempting to modify frozen or sealed objects**
  - You may be trying to change properties on objects created with `Object.freeze()` or `Object.seal()`

**How to fix it:**

✅ **Review your code** - Search for any direct assignments to `constructor` properties

✅ **Check your dependencies** - Identify which library is causing the issue by temporarily removing imports

✅ **Update libraries** - Ensure all packages are up-to-date, as newer versions often fix these issues

✅ **Use alternative approaches** - Instead of modifying `constructor`, consider:
   - Creating new objects with the desired properties
   - Using a different property name for your data
   - Using composition instead of inheritance

### SES_UNCAUGHT_EXCEPTION: ReferenceError: process is not defined

**What this error means:**

This error occurs when your code (or a library you're using) tries to access the `process` object, which is a Node.js global variable that doesn't exist in browser environments.

**Common causes:**

- **A library expects a Node.js environment**
   - Some libraries are designed for Node.js and assume `process` is available
   - This commonly happens with libraries that check `process.env` for environment variables

- **Your code references `process` directly**
   - Check if you're using `process.env.VARIABLE_NAME` or similar in your code
   - Browser code should use `import.meta.env.VARIABLE_NAME` instead (in Vite)

- **Missing polyfills or configuration**
   - Your build tool may need to be configured to provide browser-compatible shims

**How to fix it:**

✅ **Add polyfills to your build configuration**

If you're using **Vite**, add this to your `vite.config.js`:
```javascript
export default {
  define: {
    global: {},
    process: {
      env: {},
    },
  },
}
```

If you're using webpack, add this to your `webpack.config.js`:
```javascript
module.exports = {
  resolve: {
    fallback: {
      process: require.resolve('process/browser'),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
}
```