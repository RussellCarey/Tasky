import React from "react";

export const hideLoginPassword = (inpuText: string, passwordRef: React.MutableRefObject<string>) => {
  // Save typed password but hide it in the input field..
  const sentenceArray = inpuText.split(" ");
  const firstWord = sentenceArray[0];

  if (sentenceArray.length > 2 && firstWord === "login") {
    const thirdWord = sentenceArray[2];
    const thirdWordArray = thirdWord.split("");
    const lastLetter = thirdWordArray[thirdWordArray.length - 1];

    // Add the last letter when typed to the string password.
    if (lastLetter) passwordRef.current += lastLetter;

    // Build new sentence with hidden PW..
    const sentence = inpuText.split(" ");
    const hiddenPassword = "*".repeat(thirdWordArray.length);
    sentence[2] = hiddenPassword;
    const hiddenPasswordSentence = sentence.join(" ");

    return hiddenPasswordSentence;
  }

  return inpuText;
};
