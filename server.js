const path = require('path');
const express = require('express');
const http = require('http');
const con = require('./connector');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
const multer = require('multer');
const session = require('express-session');


const app = express();



const server = http.createServer(app);
const PORT = 80;
app.use(express.static(path.join(__dirname,'public')));
server.listen(PORT,()=> console.log(`Server is running on ${PORT}`));

app.use(bodyParser.urlencoded({ extended: true }));


app.post('/signup', async (req, res) => {
  const { name, age, phone, email, dob, password } = req.body;
  let hashedPassword =  await bcrypt.hash(password,10);
 
  
  const sql = `INSERT INTO User (name, age, phone_number, email, dob, password) VALUES ('${name}', '${age}', '${phone}', '${email}', '${dob}', '${hashedPassword}')`;
  con.query(sql, (err, result) => {
    if (err) {
      console.error(err);
     
      if (err.code === 'ER_DUP_ENTRY') {
        
        return res.status(400).send('Email or Phone number already exists');
      } else {
        
        return res.status(500).send('Database error');
      }
    }
    console.log('Record inserted successfully');
    console.log(`Name: ${name}`);
    console.log(`Age: ${age}`);
    console.log(`Phone: ${phone}`);
    console.log(`Email: ${email}`);
    console.log(`DOB: ${dob}`);
    console.log(`Password: ${password}`);
    console.log(`hashedPassword:${hashedPassword}`);
    

    res.redirect('/login.html');
  });
});

app.post('/login',(req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM User WHERE email = ?`;
  con.query(sql, [email], async (err, rows) => {
    if (err) {
      console.error('Error retrieving user:', err);
      return res.status(500).send('Error retrieving user');
    }

    if (rows.length === 1) {
      const hashedPassword = rows[0].password;
      try {
        const match = await bcrypt.compare(password, hashedPassword);
        
        if (match) {
          // Passwords match - successful login
          res.redirect('/home.html');
        } else {
          // Passwords do not match
          res.status(401).send('Invalid email or password');
        }
      } catch (error) {
        console.error('Error comparing passwords:', error);
        res.status(500).send('Error comparing passwords');
      }
    } else {
      // User not found
      res.status(401).send('Invalid email or password');
    }
  });
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:/Users/Pramod/OneDrive/Desktop/practice c/Web/Blog Platform/public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).single('image');

// Configure express-session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));


app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
      if (err) {
          console.error('Error uploading file:', err);
          return res.status(500).send(err);
      }
      const title = req.body.title;
      const image = req.file.filename; // Uploaded file name
      const abstract = req.body.abstract;

      console.log('Received Data:');
      console.log('Title:', title);
      console.log('Image:', image);
      console.log('Abstract:', abstract);

      const data = { title, image, abstract };

      con.query('INSERT INTO userinput SET ?', data, (err, result) => {
        if (err) {
            console.error('Error inserting data into table:', err);
            return res.status(500).send(err);
        }
        console.log('Data inserted into userinput table:', result);

        // Redirect after successful upload
        res.redirect('/home.html');
    });

      // Ensure req.session exists before setting data
      if (!req.session) {
          return res.status(500).send('Session not available');
      }

      // Store data in req.session
      req.session.uploadedData = { title, image, abstract };

      
  });
})


app.get('/getData', (req, res) => {
  
  const uploadedData = req.session.uploadedData; // Assuming uploadedData is stored in the session
  
  if (uploadedData) {
      res.json(uploadedData); // Send the stored data back to the client as JSON
  } else {
      res.status(404).send('Data not found');
  }
});

app.get('/userinput', (req, res) => {
  con.query('SELECT title, image, abstract FROM userinput', (error, results) => {
    if (error) {
      console.error('Error fetching data from userinput table: ' + error);
      return;
    }
    console.log('Fetched data from userinput table:', results);
    res.send('Data fetched from userinput table. Check console for details.');
  });
});