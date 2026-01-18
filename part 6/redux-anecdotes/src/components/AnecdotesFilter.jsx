import { useRef } from "react"
import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer";

export default function AnecdotesFilter({  }) {
  const dispatch = useDispatch()
  const filterRef = useRef()

  function handleFilterChange() {
    const filter = filterRef.current.value

    dispatch(filterChange(filter))
  }

  return (
    <section>
      <h2>filter for anecdotes</h2>

      <form onSubmit={e => e.preventDefault()}>
        <fieldset>
          <label htmlFor="anecdotes-filter ">filter</label>

          <input type="text" name="anecdotes-filter" id="anecdotes-filter" onChange={handleFilterChange} ref={filterRef} />
        </fieldset>
      </form>
    </section>
  )
}