

class HomeController {
    static async showHome (req, res,next) {
        try {
            res.status(200).json({ message: "This is homepage"});
        } catch (error) {
            next(error)
        }
    }

}

module.exports = HomeController