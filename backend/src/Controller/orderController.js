let indexRender = 'index';
const listOrder = async (req, res) => {
    // const users = await homeModel.getAllUser();
    return res.render(indexRender, {
        title: "order page",
        page: 'order/listOrder'
    });
}
export default {
    listOrder,
}