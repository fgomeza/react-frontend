import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../state/store"
import { decrement, decrementBy, increment, incrementBy } from "../state/CounterSlice"

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <h2>{count}</h2>
      <div>
        <button className="btn btn-rimary" onClick={() => dispatch(incrementBy(2))}>Increment</button>
        <button className="btn btn-rimary" onClick={() => dispatch(decrementBy(3))}>decrement</button>
      </div>
    </div>
  )
}
