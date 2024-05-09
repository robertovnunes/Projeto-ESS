module.exports = router => {
    router.get('/example', (req, res) => {
        console.log("GET /example");
        res.send('Example route');
    });
}
