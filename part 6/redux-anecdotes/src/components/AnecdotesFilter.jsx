import { useRef } from "react"

export default AnecdotesFilter({  }) {
  const filterRef = useRef()

  return (
    <section>
      <h2>filter for anecdotes</h2>

      <form onSubmit={e => e.preventDefault()}>
        <fieldset>
          <label htmlFor="anecdotes-filter ">filter</label>
          <input type="text" name="anecdotes-filter" id="anecdotes-filter" />
        </fieldset>
      </form>
    </section>
  )
}