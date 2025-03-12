

const capitalizeAndFormatWord = (word: string) => word.split("_").map(w => `${w[0].toUpperCase()}${w.slice(1).toLowerCase()}`).join(" ")

export { capitalizeAndFormatWord }