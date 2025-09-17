// List of tools available to the assistant
// No need to include the top-level wrapper object as it is added in lib/tools/tools.ts
// More information on function calling: https://platform.openai.com/docs/guides/function-calling

export const toolsList = [
  {
    name: "generate_report",
    description: "Generate a report",
    parameters: {
      currency: {
        type: "string",
        description: "Currency to generate report in",
        enum: ["AUD", "BRL", "CAD", "CHF", "CNY", "EUR", "GBP", "HKD", "INR", "JPY", "KRW", "MXN", "NOK", "NZD", "PLN", "RUB", "SEK", "SGD", "TRY", "TWD", "ZAR", "USD"],
      },
      year: {
        type: "integer",
        description: "Year to generate report for (e.g., 2023)",
      }
    },
  },
  {
    name: "analyze_report",
    description: "Analyze a previously generated report and provide insights and recommendations based on its content (eg. https://localhost:5000/reports/filename)",
    parameters: {
      file_path: {
        type: "string",
        description: "Path to the report file to analyze (should only be a filename, no paths or directories or urls. e.g., report.xlsx)",
      }
    },
  },
  // {
  //   name: "fetch_from_datasource",
  //   description: "Fetch data from the datasource for a given year and currency. This is useful when the customer wants a custom report (other than generate_report)",
  //   parameters: {
  //     currency: {
  //       type: "string",
  //       description: "Currency to fetch data in",
  //       enum: ["AUD", "BRL", "CAD", "CHF", "CNY", "EUR", "GBP", "HKD", "INR", "JPY", "KRW", "MXN", "NOK", "NZD", "PLN", "RUB", "SEK", "SGD", "TRY", "TWD", "ZAR", "USD"],
  //     },
  //     year: {
  //       type: "integer",
  //       description: "Year to fetch data for (e.g., 2023)",
  //     }
  //   },
  // },
  {
    name: "missing_percentage",
    description: "Get the percentage of missing data in the datasource for a given year and currency. This is useful to understand data quality. There are some years where there are no data at all, so the percentage will be 100%.",
    parameters: {
      currency: {
        type: "string",
        description: "Currency to check data quality for",
        enum: ["AUD", "BRL", "CAD", "CHF", "CNY", "EUR", "GBP", "HKD", "INR", "JPY", "KRW", "MXN", "NOK", "NZD", "PLN", "RUB", "SEK", "SGD", "TRY", "TWD", "ZAR", "USD"],
      },
      year: {
        type: "integer",
        description: "Year to check data quality for (e.g., 2023)",
      }
    },
  },
  {
    name: "upload_file",
    description: "Upload a file to the localhost:5000 file storage (eg. https://localhost:5000/file-storage/filename). This is useful for the generated files from the model. The file content should be base64 encoded only. The reports can't be uploaded using this function.",
    parameters: {
      filename: {
        type: "string",
        description: "Name of the file to upload (should only be a filename, no paths or directories or urls. e.g., report.pdf)",
      },
      content: {
        type: "string",
        description: "Base64 encoded content of the file to upload",
      }
    },
  },
  {
    name: "fetch_file",
    description: "Fetch a file from localhost:5000 file storage (eg. https://localhost:5000/file-storage/filename). Reports can't be fetched using this function. The path that the client can access it is on http://report-generation.com:5000/file-storage/filename, it can be displayed",
    parameters: {
      filename: {
        type: "string",
        description: "Name of the file to fetch (should only be a filename, no paths or directories or urls. e.g., report.pdf)",
      }
    },
  }
  // {
  //   name: "read_file",
  //   description: "Read a file from localhost:5000 reports directory (eg. https://localhost:5000/reports/filename)",
  //   parameters: {
  //     file_path: {
  //       type: "string",
  //       description: "Path to the file to read (should only be a filename, no paths or directories or urls. e.g., report.pdf)",
  //     }
  //   },
  // }
];
