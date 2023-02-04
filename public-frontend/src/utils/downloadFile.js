const downloadFile = (url, name) => {
  fetch(url).then(t => t.blob().then((b) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(b);
    a.setAttribute('download', name);
    a.click();
  }));
};

export default downloadFile;
