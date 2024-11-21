let regex = {
    /**
     * @description 检查注册用户名是否合法
     * <br/>this.$Regex_username -> this.sjuRegex.username
     * @param {string} val 要检查的值
     */
    username: function(val) {
        let regex_s = /^[\u4E00-\u9FA5\·]+$/;;
        if (regex_s.test(val)) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * @description 检查密码是否合法 - 8为长度,包含数字和字母
     * <br/>this.$Regex_password -> this.sjuRegex.password
     * @param {string} val 要检查的值
     */
    password: function(val) {
        let regex_s = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
        if (regex_s.test(val)) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * @description 检查注册手机号是否合法
     * <br/>this.$Regex_phonenumber -> this.sjuRegex.phoneNumber
     * @param {string} val 要检查的值
     */
    phoneNumber: function(val) {
        let regex_s = /^[1]([1-9])[0-9]{9}$/;
        if (regex_s.test(val)) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * @description 检查身份证是否合法
     * <br/>this.$Regex_IDnumer -> this.sjuRegex.idCard
     * @param {string} val 要检查的值
     */
    idCard: function(val) {
        let regex_s = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (regex_s.test(val)) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * @description 检查银行卡号是否合法
     * <br/>this.$Regex_Banknumber -> this.sjuRegex.bankNumber
     * @param {Number} val 要检查的值
     */
    bankNumber: function(str) {
        let regex_s = /^([1-9]{1})(\d{11}|\d{12}|\d{13}|\d{14}|\d{15}|\d{16}|\d{17}|\d{18}|\d{19}|\d{20}|\d{21})$/;
        if (regex_s.test(str)) {
            return true;
        } else {
            return false;
        }
    }
}
 
export default regex;