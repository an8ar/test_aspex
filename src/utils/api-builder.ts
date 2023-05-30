export function apiBuilder(url: string, data: any) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const jsonResponse = data;

      resolve(jsonResponse);
    }, 2000);
  });
}
