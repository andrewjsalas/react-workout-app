import { db } from './firebase.config'
import { useState, useEffect } from 'react';
import { collection, onSnapshot, snapshotEqual } from 'firebase/firestore';
import './App.css';
import Header from './Header';

function App() {
  const [workouts, setWorkouts] = useState([])
  const [form, setForm] = useState({
    exercise: '',
    sets: '',
    reps: '',
    rest: '',
    notes: '',
  })

  const [popupActive, setPopupActive] = useState(false)

  // Setup reference towards firebase collection
  const workoutsCollectionRef = collection(db, 'workouts')

  useEffect(() => {
    onSnapshot(workoutsCollectionRef, snapshot => {
      setWorkouts(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          viewing: false, 
          ...doc.data()
        }
      }))
    })
  }, [])

  // Shows the entire card aftering pressing 'View more'
  const handleView = id => {
    const workoutsClone = [...workouts]

    workoutsClone.forEach(workout => {
      if (workout.id === id) {
        workout.viewing = !workout.viewing 
      } else {
        workout.viewing = false
      }
    })

    setWorkouts(workoutsClone)
  }

  return (
    <div className="App">
      <Header />

      <button>Add Exercise</button>

      <div className='workouts'>
        { workouts.map((workouts, i) => (
          <div className='workout' key={workouts.id}>
            <h2>{workouts.exercise}</h2>

            { workouts.viewing && <div>
              <h3>{workouts.sets}</h3>  
              <h3>{workouts.reps}</h3>  
              <h3>{workouts.rest}</h3>
              <div>
                <p dangerouslySetInnerHTML={{ __html: workouts.notes }}></p>
              </div>
            </div>}
            
            <div className='buttons'>
              <button onClick={() => handleView(workouts.id)}
                >View { workouts.viewing ? 'less': 'more' } </button>  
              <button className='remove'>Remove</button>  
            </div>    
          </div>

        ))}
      </div>
    </div>
  );
}

export default App;
