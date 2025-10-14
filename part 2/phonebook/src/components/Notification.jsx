export default function Notification({ type, msg }) {
    return msg && 
        <p className={`phonebook__message phb-message ${type}`}>{msg}</p>
}