import chatModel from "../../model/chat/chatModel";
const addChatUser = async (req, res) => {
    const userId = req.user.id;
    // const { orderId } = req.params;
    const { mess, pinproduct } = req.body;
    if (req.method === "POST") {
        try {
            const formdata = {
                iduser: userId,
                status: 'true',
                mess: mess,
                pinproduct: pinproduct,
                see: 0,
                repdatetime: '',
                role: 1,
                idrom: userId
            };
            const result = await chatModel.addChat(formdata);
            if (result.insertId) {
                return res.status(200).json({ success: true, message: "add chat sucssess" })

            } else {
                return res.status(500).json({ success: false, message: "Chat post fail" })
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: "err not post", userId })
        }
    } else {
        return res.status(405).json({ success: false, message: "req not fo." });
    }
};
const getChatUser = async (req, res) => {
    const userId = req.user.id;
    // const { orderId } = req.params;
    if (req.method === "GET") {
        try {
            const result = await chatModel.getChatUser(userId);
            if (!result || result.length === 0) {
                return res.status(500).json({ success: false, message: "Chat get fail" })
            }
            return res.status(200).json({ success: true, message: "get success", data:result })
        } catch (error) {
            return res.status(500).json({ success: false, message: "err not get", orderId })
        }
    } else {
        return res.status(405).json({ success: false, message: "req not fo." });
    }
};
export default {
    addChatUser,
    getChatUser,
}