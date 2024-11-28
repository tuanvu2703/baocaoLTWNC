import React, { useState } from "react";
import chatService from "../../axiosService/chat/chatService";
import { useEffect } from "react";
const Chat = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [message, setMessage] = useState({
        mess: "",
        pinproduct: ""
    });
    const [time, setTime] = useState(false);
    const [startChat, setStartChat] = useState(false);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };
    const closeChat = () => {
        setIsChatOpen(false);
    };

    // useEffect(() => {
    const fetchChats = async () => {
        try {
            const result = await chatService.getAllChat();
            if (result.success) {
                setChats(result.data);
            } else {
                console.log(result)
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching chat:', error);
            setLoading(false);
        }
    };
    //     fetchChats();
    // }, []);
    useEffect(() => {
        fetchChats()
    }, []);
    useEffect(() => {
        const timeReRender = async () => {
            // if (startChat==true) {
            let timer = setTimeout(() => {
                setTime(!time);
                fetchChats()
            }, 50000);
            // setStartChat(false)
            return () => {
                clearTimeout(timer);
            };
        }
        // };
        timeReRender();
    }, [time]);

    const handleSend = async () => {
        if (message.mess == "") {
            alert("Please type a message");
        } else {
            console.log('send mess...');
            try {
                const result = await chatService.postChat(message);
                if (result.success == true) {
                    console.log('send successs')
                    setChats((prevChats) => [
                        ...prevChats,
                        {
                            mess: message.mess,
                            role: 1,
                            pinproduct: message.pinproduct,
                        },
                    ]);
                    setMessage({ mess: "", pinproduct: "" });

                } else {
                    console.log('send fail')
                }
            } catch (error) {
                console.error('Error post chat:', error);
            }
        }

    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMessage({
            ...message,
            [name]: value
        });
    };
    if (loading) {
        return;
    }
    return (
        <div>
            {isChatOpen ? (
                <div className="fixed bottom-10 right-5 w-1/3 min-w-96 h-5/5 min-h-96 bg-white border shadow-lg rounded-lg p-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">Chat</h3>
                        <button onClick={closeChat} className="text-red-500 font-bold">X</button>
                    </div>
                    <div className="h-72 overflow-auto border-b pb-4">
                        <div className="h-4"></div>
                        {chats && chats.length > 0 ? (
                            chats.map((c, index) => (
                                <p className={`border m${c.role == 1 ? "l" : "r"}-16 mb-6 bg-${c.role == 1 ? "green" : "slate"}-400 p-2`}>
                                    {
                                        c.mess
                                    }
                                </p>
                                // <p className="border ml-16 bg-green-400 p-2">
                                //     Chat messages...Chat messages...Chat messages...Chat messages...Chat messages...Chat messages...
                                // </p>
                            ))) : (""
                        )}
                    </div>
                    <div className="flex flex-row justify-center items-center pt-2">
                        <div className="w-full">
                            <input
                                type="text"
                                id="mess"
                                name="mess"
                                value={message.mess}
                                onChange={handleChange}
                                placeholder="Type your message"
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="flex justify-end ml-2">
                            <button
                                onClick={handleSend}
                                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
                            >
                                Gửi
                            </button>
                        </div>
                    </div>

                </div>
            ) : (
                <div className="fixed bottom-5 right-5">
                    <button
                        onClick={toggleChat}
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">
                        Chat
                    </button>
                </div>
            )}
        </div>
    );
}

export default Chat;
