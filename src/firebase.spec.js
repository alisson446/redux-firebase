// import mocha from 'mocha';
// import { expect } from 'chai';
// import Firebase from 'firebase';

// describe('firebase methods', function () {

//   const firebaseRef = new Firebase('https://redux-firebase-test.firebaseio.com/');

//   beforeEach(function (done) {
//     this.timeout(15000);

//     firebaseRef.set(null, done);
//   });

//   after(function (done) {
//     this.timeout(15000);

//     firebaseRef.set(null, done);
//   });

//   describe('add redux to firebase', function () {
//     it('should return object todo from firebase after save', function (done) {
//       this.timeout(15000);

//       const todoId = firebaseRef.child('todos').push().key();
//       firebaseRef.child('todos').child(todoId).set('TestAdd', (error) => {

//         firebaseRef.child('todos').child(todoId).once('value', (snapshot) => {
//           expect(snapshot.val()).to.equal('TestAdd');
//           done();
//         });
//       });

//     });
//   });

//   describe('update redux to firebase', function() {
//     it('should return object todo from firebase after update', function(done) {
//       this.timeout(15000);

//       const todoId = firebaseRef.child('todos').push().key();
//       firebaseRef.child('todos').child(todoId).set('TestAdd', (error) => {

//         firebaseRef.child('todos').child(todoId).once('value', (snapshot) => {
//           firebaseRef.child('todos').child(snapshot.key()).set('testeUpdate', (error) => {
//             firebaseRef.child('todos').child(snapshot.key()).once('value', (snapshot) => {
//               expect(snapshot.val()).to.equal('testeUpdate');
//               done();
//           });
//           });
//         });
//       });

//     });
//   });

// });
