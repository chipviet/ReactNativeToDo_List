const express = require('express');
const router = express();
var cors = require('cors');
const mongoose = require('mongoose');
const port = 3500;
var moment = require('moment')

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
  'Works_tests',
  new Schema({title: {type: String, text: true}, isCompleted: Boolean, date: Date}),
);

const courses = [];

router.get('/:page/:isSearching/:dataSearching', async (req, res) => {
  try {
    var getToken = false;
    var perPage = 10;
    const pages = req.params.page;
    const isSearching =req.params.isSearching;
    if(isSearching == 'true'){
      getToken = true
    }
    else {
      getToken = false
    }
    console.log('isSearching',isSearching, 'getToken:',getToken);
    const dataSearching = req.params.dataSearching
    console.log('dataSearching',dataSearching);
    const fetchData = await MyModel.find({ "title": /.*.*/});
    const total_page = Math.floor(Object.keys(fetchData).length / perPage) + 1
    console.log('Skip value:',(Math.abs(perPage * pages) - perPage));
    const data = await MyModel.find({ 'title': !getToken ? /.*.*/ : {'$regex': `${dataSearching}`}})
      .skip((perPage * pages) - perPage)
      .limit(perPage);
    res.send({data,total_page });
  } catch (error) {
    console.log('error', error);
  }
});

router.post('/', (req, res) => {
  console.log('req', req.body);
  console.log("time:",moment().valueOf());
  const course = {
    uid: courses.length + 1,
    title: req.body.title,
    isCompleted: req.body.isCompleted,
    date: moment().valueOf()
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

// router.get('/searching/:title',async(req,res)=> {
//    const fetchData = await MyModel.find();
//   var result  = fetchData.filter((item) => {
//     return item.title.toLowerCase().indexOf(req.params.title.toLowerCase()) !== -1
//   })
//   res.send(result);
// })