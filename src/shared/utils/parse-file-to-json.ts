export const parseJSONFile = async (file: File) => {
  return new Promise<unknown>((resolve, reject) => {
    if (!file.type.includes("json"))
      reject(new Error("mime type must be application json"));

    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text !== "string") throw new Error("Something went wrong");

      const parsedJSON = JSON.parse(text) as unknown;

      resolve(parsedJSON);
    };
    fileReader.onerror = (error) => reject(error);
    fileReader.readAsText(file);
  });
};
