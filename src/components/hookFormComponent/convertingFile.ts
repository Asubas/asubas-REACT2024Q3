export async function convert(file: File) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return (reader.onloadend = () => {
    const base64data = reader.result;
    return base64data;
  });
}
