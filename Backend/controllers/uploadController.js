const uploadFile = (req, res) => {
  res.status(200).json({
    message: "File uploaded successfully!",
    filePath: req.file.path, // full path on server
  });
};

export default uploadFile;
