module.exports = ({ server, accountFileGateway }) => {

  const getPdfFile = async (req, res) => {  
    const pdfFile = await accountFileGateway.retrieveFile();

    res.header('Content-disposition', 'attachment; filename=my-pdf.pdf');
    res.header('Content-Type', 'application/pdf');

    return res.send(pdfFile);
  };

  return {
    map: () => {
      server.get('/api/v1/files', getPdfFile);
    }
  }
}