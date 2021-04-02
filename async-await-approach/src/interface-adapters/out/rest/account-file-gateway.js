module.exports = ({ restClient }) => {

  const retrieveFile = async () => {
    const dummyUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    const { data: pdfFileBufferArray } = await restClient.get(dummyUrl, { responseType: 'arraybuffer' });
    return pdfFileBufferArray;
  };

  return {
    retrieveFile
  }
}