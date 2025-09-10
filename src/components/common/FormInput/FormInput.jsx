import styles from './formInput.module.css' ; 
export default function FormInput({label,type, placeholder , value , onChange}){
    return <div className={styles.formInputHolder}>
        <label htmlFor={type} className="inupt-label">{label.toUpperCase()}</label>
        <input  name={type} type={type} placeholder={placeholder} value={value} onChange={(e)=>{
            onChange(e)
        }} />
    </div>
}