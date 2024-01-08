import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDAMnJEt1auYrXE9nogejDX1GEu6-Cpu2U",
  authDomain: "fir-9-dojo-dc03b.firebaseapp.com",
  projectId: "fir-9-dojo-dc03b",
  storageBucket: "fir-9-dojo-dc03b.appspot.com",
  messagingSenderId: "128029629591",
  appId: "1:128029629591:web:a0064207097e246ae3ddd2",
  measurementId: "G-GE1CWVHVV1"
}

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'books')

// queries
const q = query(colRef, where("author", "==", "patrick rothfuss"))

// realtime collection data
onSnapshot(q, (snapshot) => {
  let books = []
  snapshot.docs.forEach(doc => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
})

// adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  })
  .then(() => {
    addBookForm.reset()
  })
})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})