import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as fs from "fs/promises"; // ✅ FIX: TypeScript-safe import

// Initialize MCP server
const server = new McpServer({ name: "mcp-open-library", version: "1.1.1" });

/**
 * Tool 1: Search books by author on Open Library API
 */
server.tool(
  "search_author",
  `
  Search for books on the Open Library API by author name.
  `,
  {
    author: z.string(),
  },
  async ({ author }) => {
    try {
      const data = await fetch(
        `https://openlibrary.org/search.json?author=${encodeURIComponent(author)}&limit=20`
      );

      if (!data.ok) {
        throw new Error(`HTTP error! Status: ${data.status}`);
      }

      const json = await data.json();

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(json, null, 2),
          },
        ],
      };
    } catch (error: unknown) {
      // ✅ FIX: Type guard for unknown errors
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: "text",
            text: `Error fetching data: ${message}`,
          },
        ],
      };
    }
  }
);

/**
 * Tool 2: Search for a keyword within a local file
 */
server.tool(
  "search_in_file",
  `
  Search for a specified keyword within a given file.
  Returns the lines containing the keyword and their line numbers.
  `,
  {
    filePath: z.string(),
    keyword: z.string(),
  },
  async ({ filePath, keyword }) => {
    try {
      const content = await fs.readFile(filePath, "utf-8");
      const lines = content.split(/\r?\n/);

      // ✅ FIX: Explicitly type map/filter params
      const matches = lines
        .map((line: string, index: number) => ({
          lineNumber: index + 1,
          text: line,
        }))
        .filter((entry: { lineNumber: number; text: string }) =>
          entry.text.includes(keyword)
        );

      if (matches.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No matches found for "${keyword}" in file "${filePath}".`,
            },
          ],
        };
      }

      const result = matches
        .map((m: { lineNumber: number; text: string }) => `Line ${m.lineNumber}: ${m.text}`)
        .join("\n");

      return {
        content: [
          {
            type: "text",
            text: `Found ${matches.length} match(es) for "${keyword}" in "${filePath}":\n\n${result}`,
          },
        ],
      };
    } catch (error: unknown) {
      // ✅ FIX: Handle unknown type
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: "text",
            text: `Error reading file "${filePath}": ${message}`,
          },
        ],
      };
    }
  }
);

// Connect server using stdio transport
await server.connect(new StdioServerTransport());
