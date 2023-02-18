import React, { useEffect, useState } from 'react'
import useLongPress from "./longPress";
function Message(props) {
    const [showEmojiBar, setshowEmojiBar] = useState(false)
    const [selectone, setselectone] = useState(false)
    useEffect(() => {
        props.id === props.index ? setselectone(true) : setselectone(false)
    }, [props.id])
    const onLongPress = () => {
        console.log('longpress is triggered');
        setshowEmojiBar(true)
        props.setid(props.index)
    };
    const onClick = () => {
        console.log('click is triggered')
        setshowEmojiBar(false)
    }
    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 500,
    };
    const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);
    const handleReactedEmoji = (e) => {
        e.stopPropagation();
        props.handleReact(e.target.innerText, props.index)
        setshowEmojiBar(false)
    }
    const emojis = ['😂', '😥', '❤️', '🌸', '👀', '🥰', '💔']
    return (<>
        {props.showDateBubble && props.data.time.split('  ')[1] && <div className='Date-Bubble'>{props.data.time.split('  ')[1]}</div>}
        <div className='message-container'>
            {(showEmojiBar && selectone) && <ul className={`reactions-${props.type}`}>
                {emojis.map(emj => <li className={props.data.reaction === emj ? 'activatedEnoji' : ''} onClick={e => handleReactedEmoji(e)}>{emj}</li>)}
            </ul>}
            <div {...longPressEvent} className={`message-${props.type}`}>
                <p>{props.data.message}
                    {props.data.reaction && <div className='reacted-emoji'>{props.data.reaction}</div>}
                </p>
                <span className='time'>{props.data.time.split('  ')[0]}</span>
            </div>
        </div>
    </>
    )
}
export default Message