export default function Form({ handleOnChange }) {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <fieldset>
            <label htmlFor='country'>find countries</label>
            <input type='text' name='country' id='country' onChange={handleOnChange} />
            </fieldset>
        </form>
    )
}