const express = require('express');
const router = express();
//const router = express.Router();
var cors = require('cors');
const mongoose = require('mongoose');
const port = 3500;

router.use(cors());
router.use(express.urlencoded());

router.use(express.json());

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/todolist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

var MyModel = mongoose.model(
  'Works',
  new Schema({title: String, isCompleted: Boolean}),
);

const courses = [];

// router.get('/', async (req, res) => {
//   const data = await MyModel.find({})
//   //.skip((perPage * page) - perPage)
//   .limit(10)
//   res.send(data);
// });

router.get('/:page', async (req, res) => {
  var perPage = 10;
  const pages = req.params.page;
  
  const fetchData = await MyModel.find();
  const total_page = Math.floor(Object.keys(fetchData).length / perPage) + 1

  const data = await MyModel.find({})
    .skip((perPage * pages) - perPage)
    .limit(perPage);
  res.send( { data,total_page } );
});

// //Handling HTTP Get requests
// router.get('/:_id', async (req, res) => {
//   const course = await MyModel.findById({_id: req.params._id});
//   //res.send(course)
//   res.send(req.params._id);
// });

router.post('/', (req, res) => {
  console.log('req', req.body);
  const course = {
    uid: courses.length + 1,
    title: req.body.title,
    isCompleted: req.body.isCompleted,
  };

  MyModel.create(course)
    .then(() => {
      res.status(200);
      res.send({message: 'successfully', data: course});
      console.log('successfully');
      console.log(courses);
    })
    .catch(err => {
      res.status(404);
      res.send({err});
    });
  courses.push(course);
});

router.delete('/', (req, res) => {
  console.log('ID nhan duoc:', req.query.id);
  // const course = courses.find((c) => c.id === parseInt(req.params.id));
  // if (!course)
  //   return res.status(404).send('The course with the given ID was not found')

  // const index = courses.indexOf(course);
  // courses.splice(index, 1);
  // res.send(courses);

  MyModel.deleteOne({_id: req.query.id})
    .then(() => {
      res.status(200);
      res.send({message: 'Successful deletion'});
      console.log('successfully');
    })
    .catch(err => {
      res.status(404);
      res.send({err});
    });
  //   , function (err) {
  //   if (err) console.log(err);
  //   console.log('Successful deletion');
  //   res.send('stupid');
  // });
});

router.put('/:_id', (req, res) => {
  console.log(req.params._id);
  console.log(req);
  console.log('isComplete',req.body.params.isCompleted);
  MyModel.findOneAndUpdate(
    {_id: req.params._id},
    {
      $set: {
        isCompleted: req.body.params.isCompleted,
      },
    },
    {
      new: true,
    },
  )
    .then(() => {
      res.status(200);
      res.send({ message: 'Successful change' });
      console.log('successful change')
    })
    .catch(err => {
      res.status(404);
      res.send(err)
  })
});

router.listen(port, () => console.log(`Listerning on port ${port}`));
