module.exports = (err, req, res, next) => {
    //   console.log(err.stack);
  
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
      stauts: err.status,
      message: err.message + ' DAMNNNNNNNNNN it'
    });
  };
  