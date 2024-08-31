<?php
$nama = $_POST['nama'];
$email = $_POST['email'];
$password = $_POST['password'];

$koneksi = mysqli_connect("localhost", "root", "", "dbperusahaan");

if (mysqli_connect_error()) {
    die("Koneksi database gagal: ". mysqli_connect_error());
} else {
    echo "Koneksi database berhasil";
}

$query = "insert into t_login (nama, email, password) values('$nama', '$email', '$password')";

mysqli_query($koneksi, $query);

mysqli_close($koneksi);
?>