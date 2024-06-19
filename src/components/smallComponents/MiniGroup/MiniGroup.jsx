import './MiniGroup.scss';

export default function MiniGroup({name, src}){
    return (
    <div className="mini-group">
        <img src={src} alt='group banner'/>
        <p>{`# ${name}`}</p>
    </div>
    )
}