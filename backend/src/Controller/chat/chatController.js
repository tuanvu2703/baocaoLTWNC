import chatModel from "../../model/chat/chatModel";

let indexRender = 'index';
const chat = async (req, res) => {
    const { idUser } = req.params;
    const idAdmin = req.user.id;
    const { inputmess } = req.body;
    if (req.method === "GET") {
        try {
            // const orders = await orderModel.getAllOrder();
            const messdata = await chatModel.getChatAdmin(idUser, idAdmin)
            for (const listupdate of messdata) {
                const updateSee = await chatModel.updateSeeMess(listupdate.id);
            }
            console.log(messdata)
            return res.render(indexRender, {
                title: "Chat Page",
                page: "chat/chat",
                messdata: messdata,
                iduser:idUser,
            });
        } catch (error) {
            console.error("Error fetching chat:", error.message);
            return res.status(500).send("Failed to load chat.");
        }
    } else if (req.method == "POST") {
        try {
            const formdata = {
                iduser: idAdmin,
                status: 'true',
                mess: inputmess,
                pinproduct: "",
                see: 0,
                repdatetime: '',
                role: 0,
                idrom: idUser
            };
            const result = await chatModel.addChat(formdata);
            if (result.insertId) {
                return res.redirect('/chat/' + idUser);
            } else {
                return res.status(500).json({ success: false, message: "Chat post failed" });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: "err not post", userId })
        }
    } else {
        return;
    }

};
const listuserchat = async (req, res) => {
    if (req.method === "GET") {
        try {
            const lisuser = await chatModel.getAllUserNotRep()
            console.log(lisuser)
            return res.render(indexRender, {
                title: "List User Chat Page",
                page: "chat/listuserchat",
                lisuser: lisuser,
            });
        } catch (error) {
            console.error("Error fetching list user chat:", error.message);
            return res.status(500).send("Failed to load list user chat.");
        }
    } else {
        return;
    }

};
const hiddenUserChat = async (req, res) => {
    const { idUser } = req.params;
    if (req.method == "POST") {
        try {
            const result = await chatModel.updateStatusMess(idUser);
            return res.redirect('/listuserchat');
        } catch (error) {
            return res.status(500).json({ success: false, message: "err not post", userId })
        }
    } else {
        return;
    }

};
export default {
    chat,
    listuserchat,
    hiddenUserChat,
}