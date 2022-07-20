const { userExtractor }= require('../utils/middleware')
const dialogsRouter = require('express').Router()
const User = require('../models/user')
const Personal = require('../models/personal')
const Dialog = require('../models/dialog')

//get all users dialogs without messages
dialogsRouter.get( '/',userExtractor, async (request, response) => {

  const user = await User
    .findById(request.user.id)
    .populate({
      path: 'dialogs',
      populate: { path: 'personal', select: ['username','avatar','rating','isOnline','id'] },
    })
  const dialogs = user.dialogs
  console.log('dialogs', dialogs)

  const initialState = [
    {
      'personal': {
        'username': 'Gross Clarke',
        'avatar': null,
        'rating': 40,
        'isOnline': true,
        'id': '62c59248d2a67a4cb7934d39'
      },
      'id': '62c5924859caf6648982e10e',
      'date': 'Mon Jun 21 2021 14:17:55 GMT+0300 (Москва, стандартное время)'
    },
    {
      'personal': {
        'username': 'Goodwin Haynes',
        'avatar': null,
        'rating': 31,
        'isOnline': true,
        'id': '62c59248de0644ebb9b4872c'
      },
      'id': '62c59248a185b0d9f2682977',
      'date': 'Fri Apr 22 2022 21:08:28 GMT+0300 (Москва, стандартное время)'
    },
    {
      'personal': {
        'username': 'Sandoval Bean',
        'avatar': null,
        'rating': 40,
        'isOnline': false,
        'id': '62c59248bd10b3605fc285c8'
      },
      'id': '62c5924892360c6354554608',
      'date': 'Sun Mar 07 2021 03:20:12 GMT+0300 (Москва, стандартное время)'
    },
    {
      'personal': {
        'username': 'Nicholson Horn',
        'avatar': null,
        'rating': 32,
        'isOnline': true,
        'id': '62c59248541738e4db99eab2'
      },
      'id': '62c59248cc38036c44637c5d',
      'date': 'Mon Jan 18 2021 22:22:54 GMT+0300 (Москва, стандартное время)'
    },
    {
      'personal': {
        'username': 'Suarez Mccormick',
        'avatar': null,
        'rating': 30,
        'isOnline': true,
        'id': '62c592484e4f6b8402da4b0f'
      },
      'id': '62c59248c08345db34696546',
      'date': 'Tue Jan 04 2022 11:57:56 GMT+0300 (Москва, стандартное время)'
    },
    {
      'personal': {
        'username': 'Mcknight Klein',
        'avatar': null,
        'rating': 37,
        'isOnline': false,
        'id': '62c59248f317c7886f0ae253'
      },
      'id': '62c59248c6b021fa084c995f',
      'date': 'Tue Feb 22 2022 05:02:16 GMT+0300 (Москва, стандартное время)'
    },
    {
      'personal': {
        'username': 'Donaldson Livingston',
        'avatar': null,
        'rating': 26,
        'isOnline': true,
        'id': '62c592481fc245c2f4c4e787'
      },
      'id': '62c592485e7a20bbad117071',
      'date': 'Mon May 16 2022 07:28:45 GMT+0300 (Москва, стандартное время)'
    },
    {
      'personal': {
        'username': 'Ola Holloway',
        'avatar': null,
        'rating': 33,
        'isOnline': false,
        'id': '62c59248f61375bbcbd2f63f'
      },
      'id': '62c59248375d4ea3b5bbbe8f',
      'date': 'Sun Jun 26 2022 12:25:25 GMT+0300 (Москва, стандартное время)'
    },
    {
      'personal': {
        'username': 'Mcconnell Lowe',
        'avatar': null,
        'rating': 21,
        'isOnline': false,
        'id': '62c592487501c9875eadd612'
      },
      'id': '62c59248e77870990c876a12',
      'date': 'Tue Jun 14 2022 03:41:57 GMT+0300 (Москва, стандартное время)'
    },
    {
      'personal': {
        'username': 'Helena Michael',
        'avatar': null,
        'rating': 27,
        'isOnline': true,
        'id': '62c59248fc6c34ac0f22d725'
      },
      'id': '62c59248d4218347b063af1a',
      'date': 'Fri Jul 30 2021 22:12:10 GMT+0300 (Москва, стандартное время)'
    },
    {
      'personal': {
        'username': 'Marina Barnes',
        'avatar': null,
        'rating': 23,
        'isOnline': false,
        'id': '62c59248b3b1f4e66f080173'
      },
      'id': '62c592483dd8e55a2d590764',
      'date': 'Fri May 20 2022 08:33:27 GMT+0300 (Москва, стандартное время)'
    },
    {
      'personal': {
        'username': 'Elba Gomez',
        'avatar': null,
        'rating': 26,
        'isOnline': true,
        'id': '62c592483fa1103ae2632e15'
      },
      'id': '62c59248f428c9ddf928865f',
      'date': 'Fri Oct 01 2021 03:15:50 GMT+0300 (Москва, стандартное время)'
    },
    {
      'personal': {
        'username': 'Debora Calderon',
        'avatar': null,
        'rating': 39,
        'isOnline': false,
        'id': '62c592487a17b2c9acf4bfa1'
      },
      'id': '62c592487ede5b1d8a757ff6',
      'date': 'Mon May 09 2022 19:16:19 GMT+0300 (Москва, стандартное время)'
    },
    {
      'personal': {
        'username': 'Michael Kaufman',
        'avatar': null,
        'rating': 24,
        'isOnline': false,
        'id': '62c592480f69f3bd59624c61'
      },
      'id': '62c59248bbf7e2fdbcf7178a',
      'date': 'Fri Jan 07 2022 10:21:20 GMT+0300 (Москва, стандартное время)'
    },
    {
      'personal': {
        'username': 'Ashley Duke',
        'avatar': null,
        'rating': 29,
        'isOnline': false,
        'id': '62c592480675f260525bf1ce'
      },
      'id': '62c5924879d5951f3c38b1b7',
      'date': 'Wed Jul 07 2021 13:46:30 GMT+0300 (Москва, стандартное время)'
    },
    {
      'personal': {
        'username': 'Edwina Lee',
        'avatar': null,
        'rating': 32,
        'isOnline': true,
        'id': '62c5924834f7db47dccac378'
      },
      'id': '62c59248facdbdf11bfc3a71',
      'date': 'Mon Aug 30 2021 07:16:37 GMT+0300 (Москва, стандартное время)'
    },
    {
      'personal': {
        'username': 'Hurst Mcgowan',
        'avatar': null,
        'rating': 40,
        'isOnline': true,
        'id': '62c5924839d4fe45f256f4f9'
      },
      'id': '62c592487e026ce2b7b8b358',
      'date': 'Sun Aug 08 2021 07:20:33 GMT+0300 (Москва, стандартное время)'
    },
    {
      'personal': {
        'username': 'Charles Riggs',
        'avatar': null,
        'rating': 21,
        'isOnline': false,
        'id': '62c59248fe46859e206028bd'
      },
      'id': '62c59248bd6fc5dcedefece8',
      'date': 'Mon Dec 27 2021 06:04:44 GMT+0300 (Москва, стандартное время)'
    },
    {
      'personal': {
        'username': 'Dona Torres',
        'avatar': null,
        'rating': 38,
        'isOnline': false,
        'id': '62c5924854722aa87d242bae'
      },
      'id': '62c5924800049b10d4c75a33',
      'date': 'Tue Feb 22 2022 00:07:06 GMT+0300 (Москва, стандартное время)'
    },
    {
      'personal': {
        'username': 'Phillips Terrell',
        'avatar': null,
        'rating': 32,
        'isOnline': true,
        'id': '62c59248107f6d809f0793f8'
      },
      'id': '62c59248e00ac2403033c47f',
      'date': 'Sun Oct 17 2021 22:50:31 GMT+0300 (Москва, стандартное время)'
    }
  ]
  response.json(initialState)
})
//create dialog
dialogsRouter.post('/',userExtractor, async (request, response) => {
  console.log('\x1b[42m', 'start','\x1b[0m')
  const {
    user,
    personal
  } = request.body

  const newDialog = new Dialog({
    user,
    personal
  })
  const createdDialog = await newDialog.save()

  const updateUser = await User.findById(user)
  const updatePersonal = await Personal.findById(personal)

  const newUserDialogs =  {
    dialogs: updateUser.dialogs.concat(createdDialog.id)
  }
  const newPersonalDialogs = {
    dialogs: updatePersonal.dialogs.concat(createdDialog.id)
  }

  await User.findByIdAndUpdate(user ,newUserDialogs )
  await Personal.findByIdAndUpdate(personal ,newPersonalDialogs)

  // const updatedUser = User.findOneAndUpdate()
  // const updatedPrsonal = Personal.findOneAndUpdate()


  response.json(createdDialog)
})
//delete dialog  ( доделать )
dialogsRouter.delete('/:id',userExtractor, async (request, response) => {
  const id = request.params.id
  await Dialog.findByIdAndRemove(id)
  response.status(204).send('dialog is removed').end()
})
//get dialog with messages
dialogsRouter.get('/:id', userExtractor, async (request, response) => {
  const id = request.params.id
  const dialog = await Dialog
    .findById(id)
    .populate('messages')
    .populate('personal',['username','avatar','rating','isOnline','id'])
    .populate('user','id')
  console.log('dialog', dialog)

  const messages = {
    'personal': {
      'username': 'Gross Clarke',
      'avatar': null,
      'rating': 40,
      'isOnline': true,
      'id': '62c59248d2a67a4cb7934d39'
    },
    'id': '62c5924859caf6648982e10e',
    'date': 'Mon Jun 21 2021 14:17:55 GMT+0300 (Москва, стандартное время)',
    messages: [
      {
        'id': '62c7fd859e64a91568256514',
        'dialog': '62c5924859caf6648982e10e',
        'text': 'Nulla velit exercitation ex elit eiusmod proident officia ad nisi sunt dolore in.',
        'createdAt': 'Fri Jul 08 2022 12:48:53 GMT+0300 (Москва, стандартное время)',
        'isRead': true,
        'author': '&',
        'type': '',
        'personal': {
          'username': 'Higgins Chang',
          'avatar': null,
          'id': '62c7fd858c540e971d625a8b'
        }
      },
      {
        'id': '62c7fd85ddedb37cee47f484',
        'dialog': '62c5924859caf6648982e10e',
        'text': 'Excepteur sit eiusmod ut non.',
        'createdAt': 'Fri Jul 08 2022 12:48:53 GMT+0300 (Москва, стандартное время)',
        'isRead': true,
        'author': '&',
        'type': '',
        'personal': {
          'username': 'Gonzalez Hendrix',
          'avatar': null,
          'id': '62c7fd8586862ddbbfc03b01'
        }
      },
      {
        'id': '62c7fd855eb009b6d799efd1',
        'dialog': '62c5924859caf6648982e10e',
        'text': 'Veniam est ex enim quis enim adipisicing enim nulla.',
        'createdAt': 'Fri Jul 08 2022 12:48:53 GMT+0300 (Москва, стандартное время)',
        'isRead': false,
        'author': '0',
        'type': '',
        'personal': {
          'username': 'Daniels Mcdowell',
          'avatar': null,
          'id': '62c7fd858865644b086799eb'
        }
      },
      {
        'id': '62c7fd85ae4469cca6e86c8d',
        'dialog': '62c5924859caf6648982e10e',
        'text': 'Elit sit mollit elit esse in dolore irure do exercitation reprehenderit reprehenderit aute aliquip cupidatat.',
        'createdAt': 'Fri Jul 08 2022 12:48:53 GMT+0300 (Москва, стандартное время)',
        'isRead': false,
        'author': '&',
        'type': '',
        'personal': {
          'username': 'Christine Goodman',
          'avatar': null,
          'id': '62c7fd850d115d9e186aac1a'
        }
      },
      {
        'id': '62c7fd85f4f77a43ca102788',
        'dialog': '62c5924859caf6648982e10e',
        'text': 'Dolor quis do adipisicing sint nisi.',
        'createdAt': 'Fri Jul 08 2022 12:48:53 GMT+0300 (Москва, стандартное время)',
        'isRead': true,
        'author': '&',
        'type': '',
        'personal': {
          'username': 'Colon Roberson',
          'avatar': null,
          'id': '62c7fd850f0491483524d337'
        }
      },
      {
        'id': '62c7fd85743168f55ac609f9',
        'dialog': '62c5924859caf6648982e10e',
        'text': 'Duis pariatur et incididunt voluptate deserunt incididunt eiusmod consequat dolor enim nulla.',
        'createdAt': 'Fri Jul 08 2022 12:48:53 GMT+0300 (Москва, стандартное время)',
        'isRead': false,
        'author': '0',
        'type': '',
        'personal': {
          'username': 'Chapman Wiley',
          'avatar': null,
          'id': '62c7fd857863c84b4cd14c83'
        }
      },
      {
        'id': '62c7fd85e485845cb063fccf',
        'dialog': '62c5924859caf6648982e10e',
        'text': 'Reprehenderit eu cupidatat do incididunt in qui.',
        'createdAt': 'Fri Jul 08 2022 12:48:53 GMT+0300 (Москва, стандартное время)',
        'isRead': true,
        'author': '&',
        'type': '',
        'personal': {
          'username': 'Lorene Hogan',
          'avatar': null,
          'id': '62c7fd8582e5f73b1915c78c'
        }
      },
      {
        'id': '62c7fd859123810c54e33658',
        'dialog': '62c5924859caf6648982e10e',
        'text': 'Mollit do mollit ullamco irure eiusmod velit minim ullamco eu.',
        'createdAt': 'Fri Jul 08 2022 12:48:53 GMT+0300 (Москва, стандартное время)',
        'isRead': true,
        'author': '0',
        'type': '',
        'personal': {
          'username': 'Millie Norton',
          'avatar': null,
          'id': '62c7fd85eeeffbe67aada07d'
        }
      },
      {
        'id': '62c7fd8592199acc54ac704b',
        'dialog': '62c5924859caf6648982e10e',
        'text': 'Non Lorem ea eiusmod nulla laboris nulla sit consequat ad.',
        'createdAt': 'Fri Jul 08 2022 12:48:53 GMT+0300 (Москва, стандартное время)',
        'isRead': false,
        'author': '&',
        'type': '',
        'personal': {
          'username': 'Stephanie Duffy',
          'avatar': null,
          'id': '62c7fd853fcd7b9c02b30457'
        }
      },
      {
        'id': '62c7fd859c70808fea6b5b88',
        'dialog': '62c5924859caf6648982e10e',
        'text': 'Et do elit consequat id aliqua velit ad ullamco duis labore culpa.',
        'createdAt': 'Fri Jul 08 2022 12:48:53 GMT+0300 (Москва, стандартное время)',
        'isRead': false,
        'author': '0',
        'type': '',
        'personal': {
          'username': 'Silva Lowe',
          'avatar': null,
          'id': '62c7fd85f652afabe020075b'
        }
      },
      {
        'id': '62c7fd8544b3c8bb4246cf2d',
        'dialog': '62c5924859caf6648982e10e',
        'text': 'Anim consequat cillum sint adipisicing in sunt Lorem aliquip do enim eiusmod ex.',
        'createdAt': 'Fri Jul 08 2022 12:48:53 GMT+0300 (Москва, стандартное время)',
        'isRead': true,
        'author': '&',
        'type': '',
        'personal': {
          'username': 'Nadine Richardson',
          'avatar': null,
          'id': '62c7fd8550a853ba228d133b'
        }
      },
      {
        'id': '62c7fd85104f613a535bfcf2',
        'dialog': '62c5924859caf6648982e10e',
        'text': 'Et dolor officia aliquip aliqua fugiat cupidatat exercitation.',
        'createdAt': 'Fri Jul 08 2022 12:48:53 GMT+0300 (Москва, стандартное время)',
        'isRead': false,
        'author': '0',
        'type': '',
        'personal': {
          'username': 'Cobb Ramirez',
          'avatar': null,
          'id': '62c7fd85c9d8e8b763570508'
        }
      },
      {
        'id': '62c7fd853a345a5e38bcaa7f',
        'dialog': '62c5924859caf6648982e10e',
        'text': 'Dolore consectetur exercitation elit laborum.',
        'createdAt': 'Fri Jul 08 2022 12:48:53 GMT+0300 (Москва, стандартное время)',
        'isRead': false,
        'author': '0',
        'type': '',
        'personal': {
          'username': 'Ray Taylor',
          'avatar': null,
          'id': '62c7fd85aa8e8500e8adff1d'
        }
      },
      {
        'id': '62c7fd85feea9cb435f3e157',
        'dialog': '62c5924859caf6648982e10e',
        'text': 'Adipisicing consequat magna aliquip adipisicing eu excepteur excepteur quis consequat anim irure.',
        'createdAt': 'Fri Jul 08 2022 12:48:53 GMT+0300 (Москва, стандартное время)',
        'isRead': true,
        'author': '&',
        'type': '',
        'personal': {
          'username': 'Henson Collins',
          'avatar': null,
          'id': '62c7fd8568159c92904a2512'
        }
      },
      {
        'id': '62c7fd857579630bb5eaf6a1',
        'dialog': '62c5924859caf6648982e10e',
        'text': 'Amet ullamco cillum pariatur exercitation ipsum cillum incididunt tempor proident labore sunt aliqua.',
        'createdAt': 'Fri Jul 08 2022 12:48:53 GMT+0300 (Москва, стандартное время)',
        'isRead': false,
        'author': '&',
        'type': '',
        'personal': {
          'username': 'Lindsey Nash',
          'avatar': null,
          'id': '62c7fd85a5500b59ecd61c28'
        }
      },
      {
        'id': '62c7fd85d77b9be8cee081ec',
        'dialog': '62c5924859caf6648982e10e',
        'text': 'Duis nisi irure occaecat minim nostrud.',
        'createdAt': 'Fri Jul 08 2022 12:48:53 GMT+0300 (Москва, стандартное время)',
        'isRead': false,
        'author': '&',
        'type': '',
        'personal': {
          'username': 'Claire Jackson',
          'avatar': null,
          'id': '62c7fd855ede2fbb330d4045'
        }
      },
      {
        'id': '62c7fd85ce4eb40b18f3ddb9',
        'dialog': '62c5924859caf6648982e10e',
        'text': 'Elit deserunt consequat et dolore ut enim sunt.',
        'createdAt': 'Fri Jul 08 2022 12:48:53 GMT+0300 (Москва, стандартное время)',
        'isRead': true,
        'author': '0',
        'type': '',
        'personal': {
          'username': 'Jimenez Bowman',
          'avatar': null,
          'id': '62c7fd853c266714211454da'
        }
      },
      {
        'id': '62c7fd857ff25607d99f67ef',
        'dialog': '62c5924859caf6648982e10e',
        'text': 'Excepteur non aliquip deserunt anim quis elit amet est exercitation consectetur.',
        'createdAt': 'Fri Jul 08 2022 12:48:53 GMT+0300 (Москва, стандартное время)',
        'isRead': false,
        'author': '&',
        'type': '',
        'personal': {
          'username': 'Reyes Cooley',
          'avatar': null,
          'id': '62c7fd858f449e41a0f84201'
        }
      },
      {
        'id': '62c7fd85055bad5d605a3bbf',
        'dialog': '62c5924859caf6648982e10e',
        'text': 'Ut elit in labore eiusmod veniam sit ad dolore.',
        'createdAt': 'Fri Jul 08 2022 12:48:53 GMT+0300 (Москва, стандартное время)',
        'isRead': true,
        'author': '&',
        'type': '',
        'personal': {
          'username': 'Chaney Barnett',
          'avatar': null,
          'id': '62c7fd85cec7c000068290b3'
        }
      },
      {
        'id': '62c7fd85442e1ac5685c42b0',
        'dialog': '62c5924859caf6648982e10e',
        'text': 'Ea exercitation est non Lorem culpa aute.',
        'createdAt': 'Fri Jul 08 2022 12:48:53 GMT+0300 (Москва, стандартное время)',
        'isRead': false,
        'author': '0',
        'type': '',
        'personal': {
          'username': 'Leila Hampton',
          'avatar': null,
          'id': '62c7fd85b36ca846a7fbb310'
        }
      }
    ]
  }
  response.json(messages)
})

//add mail
// dialogsRouter.post('/:id', async (request, response) => {
//   console.log('\x1b[42m fffffffffffffffff \x1b[0m')

//   const decodedToken = await jwt.verify(request.token, process.env.SECRET)
//   if (!decodedToken.id) {
//     return response.status(401).json({
//       error: 'token missing or invalid'
//     })
//   }
//   const {
//     text,
//     chatId,
//   } = request.body
//   console.log('\x1b[42m chatId', chatId, '\x1b[0m')
//   console.log('\x1b[42mchatId', chatId, '\x1b[0m')
//   const id = request.params.id

//   if (!chatId) {
//     const chat = new Chat({
//       user: decodedToken.id,
//       personal: id,
//       massages: [],
//     })
//     const savedChat = await chat.save()

//     const ownerUser = await User.findById(decodedToken.id)
//     ownerUser.chats = ownerUser.chats.concat(savedChat._id)
//     await ownerUser.save()

//     const recipientUser = await Personal.findById(id)
//     recipientUser.chats = recipientUser.chats.concat(savedChat._id)
//     await recipientUser.save()

//     const newChat = await Chat.findById(savedChat._id)

//     const newMassege = new Massage({
//       ovner: decodedToken.id,
//       chat: newChat._id,
//       text: text,
//       data: new Date(),
//       isReaded: false,
//     })
//     const savedMassage = await newMassege.save()

//     newChat.massages = newChat.massages.concat(savedMassage._id)
//     await newChat.save()

//     return response.json(savedMassage)
//   } else {
//     console.log('\x1b[42m satrt \x1b[0m')

//     const chat = await Chat.findById(chatId)

//     const newMassege = new Massage({
//       ovner: decodedToken.id,
//       recipient: id,
//       chat: chat._id,
//       text: text,
//       data: new Date(),
//       isReaded: false,
//     })
//     const savedMassage = await newMassege.save()
//     console.log('\x1b[42m savedMassage', savedMassage, '\x1b[0m')
//     chat.massages = chat.massages.concat(savedMassage._id)
//     await chat.save()

//     return response.json(savedMassage)
//   }

// })



module.exports = dialogsRouter