<?
// получаем информацию о файле из ключа image
$images = $_FILES;

// тип файлов которые можно загрузить
$types = ["image/jpeg", "image/png"];

foreach ($images as $image) {
    // валидация на тип данных
    // идём в массив с типами, тип текущего файла
    if (!in_array($image["type"], $types)) {
        die('Некорректный тип файла');
    }

    // валидация на размер файла
    // определяем размер вайла в мегабайтах
    $fileSize = $image["size"] / 1000000;
    $maxSize = 10; // mb

    // проверка размера файла
    if ($fileSize > $maxSize) {
        die('Неверный размер файла');
    }
    // Создаём папку uploads в корне проекта, если её нет
    if (!is_dir('../uploads')) {
        mkdir('../uploads', 0777, true);
    }
    //изменяеем расширение текущего файла
    $extension = pathinfo($image["name"], PATHINFO_EXTENSION);

    // формируем уникальное имя с помощью функции time()  
    $fileName = time() . ".$extension";

    // загружаем файл и проверяем
    if (!move_uploaded_file($image["tmp_name"], "../uploads/" . $fileName)) {
        die('Ошибка загрузки файла');
    }
}


echo json_encode(['status' => true]);

