var hours = parseInt(process.argv[2], 10);
var minutes = parseInt(process.argv[3], 10);

/**
 * Перевод арабского числа в римскую нотацию
 * @author Savi
 * @param time
 * @returns
*/
function RomanTime(hours, minutes){
    /**
     * Валидация входных данных
     * @param {number} hours
     * @private
     * @return {string} Wrong input || {number} hours
     */
    RomanTime.prototype._validate_hours = function (hours){
        if (hours < 0 || hours > 23){
            return 'Время указано не верно';
        }
        else{
            return hours;
        }
    };

    /**
     * Валидация входных данных
     * @param {number} hours
     * @private
     * @returns {string} Wrong input || {number} minutes
     */
    RomanTime.prototype._validate_minutes = function (minutes){
        if (minutes < 0 || minutes > 59){
            return 'Время указано не верно';
        }
        else{
            return minutes;
        }
    };

    /** @private */ this._hours = this._validate_hours(hours);
    /** @private */ this._minutes = this._validate_minutes(minutes);

    /** @private */ this.roman_hours;
    /** @private */ this.roman_minutes;

    /**
     * Перевод арабской цифры (1-60) в римскую нотацию
     * @param {number} number
     * @private
     * @returns {string} roman_number
     */
    RomanTime.prototype._get_roman_number = function(number){
        var dictionary = {
                            0: '-',
                            1: 'I',
                            2: 'II',
                            3: 'III',
                            4: 'IV',
                            5: 'V',
                            6: 'VI',
                            7: 'VII',
                            8: 'VIII',
                            9: 'IX',
                            10: 'X',
                            50: 'L'
                        };
        var roman_number = '';
        switch (true) {
            case number <= 10:
                roman_number += dictionary[number];
                break;
            case number > 10 && number < 40:
                while (number > 10){
                        roman_number += dictionary[10];
                        number -= 10;
                    }
                roman_number += dictionary[number];
                break;
            case number >= 40 && number <= 49:
                roman_number += dictionary[10];
                roman_number += dictionary[50];
                number -= 40;
                if (number > 0){
                    roman_number += dictionary[number];
                }
                break;
            case number >= 50 && number <= 60:
                roman_number += dictionary[50];
                number -= 50;
                if (number > 0){
                    roman_number += dictionary[number];
                }
                break;
        }
        return roman_number;
    };

    /**
     * Получение времени в римской нотации
     * @private
     * @returns {string} 'Check your input !' || {string} this.roman_hours + {string} this.roman_minutes
     */
    RomanTime.prototype._translate_to_roman_time = function (){
        if ((this._hours == 'Время указано не верно') || (this._minutes == 'Время указано не верно')){
            return 'Время указано не верно';
        }
        else{
            this.roman_hours = this._get_roman_number(this._hours);
            this.roman_minutes = this._get_roman_number(this._minutes);
            return [this.roman_hours, this.roman_minutes].join(':');
        }
    };

    /** @private */ this.roman_time = this._translate_to_roman_time();

    /**
     * Простой геттер метод для вывода
     * @returns {stirng} 'Check your input !' || {string} roman_time
     */
    RomanTime.prototype.get_roman_time = function (){
        return this.roman_time;
    };

    /**
     * Рисуем в ASCII нотации полученное время, если это возможно
     */
    // Очевидно, что окошко придётся немного ресайзить, чтобы получился красивый вывод
    RomanTime.prototype.draw_roman_time = function (){
        var ASCII = {
                    '-': [
                            '              ',
                            '              ',
                            '              ',
                            '    ______    ',
                            '              ',
                            '              ',
                            '              ',
                            '              '
                        ],
                    ':': [
                            '              ',
                            '              ',
                            '    (_)(_)    ',
                            '    (_)(_)    ',
                            '              ',
                            '    (_)(_)    ',
                            '    (_)(_)    ',
                            '              '
                        ],
                    'I': [
                            '    _  _  _    ',
                            '   (_)(_)(_)   ',
                            '      (_)      ',
                            '      (_)      ',
                            '      (_)      ',
                            '      (_)      ',
                            '    _ (_) _    ',
                            '   (_)(_)(_)   '
                        ],
                    'V': [
                            '  _           _  ',
                            ' (_)         (_) ',
                            ' (_)         (_) ',
                            ' (_)         (_) ',
                            ' (_)_       _(_) ',
                            '   (_)_   _(_)   ',
                            '     (_)_(_)     ',
                            '       (_)       ',
                            ],
                    'X': [
                            '  _           _  ',
                            ' (_)_       _(_) ',
                            '   (_)_   _(_)   ',
                            '     (_)_(_)     ',
                            '      _(_)_      ',
                            '    _(_) (_)_    ',
                            '  _(_)     (_)_  ',
                            ' (_)         (_) '
                        ],
                    'L': [
                            '  _            ',
                            ' (_)           ',
                            ' (_)           ',
                            ' (_)           ',
                            ' (_)           ',
                            ' (_)           ',
                            ' (_) _  _  _   ',
                            ' (_)(_)(_)(_)  '
                    ],
                };
        if (this.roman_time == 'Время указано не верно'){
            console.log('Я не могу это нарисовать =(...');
        }
        else{
            for (var i = 0; i < 8; i++){
                var temp_figure = '';
                for (var k = 0; k < this.roman_time.length; k++){
                    temp_figure += ASCII[this.roman_time[k]][i];
                }
                console.log(temp_figure);
            }
        }

    };
};

var T = new RomanTime(hours, minutes);
console.log(T.get_roman_time());
T.draw_roman_time();
