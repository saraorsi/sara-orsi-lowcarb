export const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  console.log("Button clicked!", event);
};

export const handleInputChange = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  console.log("Input changed!", event.target.value);
};
