# Permguard Node.js SDK Example

A comprehensive example demonstrating how to use the Permguard Node.js SDK for authorization and permission checks in your applications.

## Running the Example

1. **Build the library**

   ```bash
   npm install
   npm run build
   npm link
   ```

2. **Install dependencies in the example app folder**

   ```bash
   cd ./examples/cmd
   npm install
   ```

3. **Link the Permguard library to the example**

   ```bash
   npm link permguard
   ```

4. **Start Permguard PDP Service**

   Ensure your Permguard PDP service is running on localhost:9094.

   If you need to configure a different address, you can update it in the example configuration.

5. **Run the example**

   ```bash
   npm run start
   ```

## Features Demonstrated

This example demonstrates several key features of the Permguard Node.js SDK:

- **JSON Request Check**
- **Atomic Evaluation Check**
- **Multiple Evaluation Check**
