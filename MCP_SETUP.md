# Next.js Devtools MCP Server Setup

## Issue
The Next.js devtools MCP server is showing "No server info found" errors because it's trying to connect to the default port (3000) while the Next.js dev server is running on port 4200.

## Solution

The MCP endpoint is accessible at `http://localhost:4200/_next/mcp` and is working correctly. The issue is that the Cursor MCP client needs to be configured to use port 4200 instead of the default port 3000.

### Steps to Fix:

1. **Open Cursor Settings**
   - Go to Cursor Settings → Features → MCP Servers
   - Or edit the MCP configuration file directly

2. **Update the Next.js Devtools MCP Configuration**
   
   The MCP server configuration should specify port 4200. Update your MCP configuration to include:
   
   ```json
   {
     "mcpServers": {
       "next-devtools": {
         "command": "npx",
         "args": ["-y", "next-devtools-mcp@latest"],
         "env": {
           "NEXT_PORT": "4200"
         }
       }
     }
   }
   ```

3. **Alternative: Use Environment Variable**
   
   You can also set an environment variable before starting Cursor:
   
   ```bash
   export NEXT_PORT=4200
   ```

4. **Restart Cursor**
   - After updating the configuration, restart Cursor completely to apply the changes

5. **Verify Connection**
   - The MCP server should now be able to discover the Next.js dev server on port 4200
   - Check that the "No server info found" errors are resolved

## Current Status

- ✅ Next.js dev server is running on port 4200
- ✅ MCP endpoint is accessible at `http://localhost:4200/_next/mcp`
- ⚠️ MCP client needs to be configured to use port 4200

## Testing the MCP Endpoint

You can test the MCP endpoint manually:
```bash
curl -H "Accept: text/event-stream" http://localhost:4200/_next/mcp
```

The endpoint responds correctly but requires the `text/event-stream` content type header.

