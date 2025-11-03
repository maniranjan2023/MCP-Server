# 📚 MCP Open Library & File Search Server

This project is an **MCP (Model Context Protocol)** server built with TypeScript and Node.js.
It provides two core tools:

1. `search_author` — search for books by author using the Open Library API.
2. `search_in_file` — search for a keyword inside any local text file.

---

## 🚀 Features

### 🔍 `search_author`

Fetches book data by a given author name from the Open Library API.

**Input**

```json
{
  "author": "tolkien"
}
```

**Output**
A JSON response containing book search results.

---

### 🗂 `search_in_file`

Scans a file for a keyword and returns the matching lines and their numbers.

**Input**

```json
{
  "filePath": "./sample.txt",
  "keyword": "example"
}
```

**Output**

```text
Found 2 match(es) for "example" in "./sample.txt":

Line 3: This is an example line
Line 8: Another example text
```

---

## 🏗️ Project Structure

```
MCP/
├── build/           # Compiled JS files
├── src/             # Source TypeScript files
│   └── index.ts
├── sample.txt       # Example file for keyword search
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

---

## ⚙️ Setup & Run

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Build**

   ```bash
   npm run build
   ```

3. **Run**

   ```bash
   npm start
   ```

   Or directly (without compiling):

   ```bash
   npm run dev
   ```

---

## 🧩 Example: Using in MCP Inspector

For `search_in_file`:

```json
{
  "filePath": "./sample.txt",
  "keyword": "OpenAI"
}
```

For `search_author`:

```json
{
  "author": "tolkien"
}
```

---

## 🧠 Technologies

* TypeScript
* Node.js
* [@modelcontextprotocol/sdk](https://www.npmjs.com/package/@modelcontextprotocol/sdk)
* [Zod](https://zod.dev/)

---

## 🧾 License

MIT License © 2025

---

## 👨‍💻 Author

**Your Name**
📧 [maniranjan1512@gmail.com](mailto:maniranjan1512@gmail.com)
🌐 [github.com/maniranjan2023](https://github.com/maniranjan2023)
