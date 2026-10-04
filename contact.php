<?php
declare(strict_types=1);

/*
 * SS Transync contact form for GoDaddy/cPanel hosting.
 * Change the recipient below if your business email is different.
 */
$recipient = 'fleet@sstransync.com';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html#contact', true, 303);
    exit;
}

// Honeypot spam field.
if (!empty($_POST['website'] ?? '')) {
    header('Location: index.html#contact', true, 303);
    exit;
}

function clean(string $value): string {
    $value = trim($value);
    $value = str_replace(["\r", "\n"], ' ', $value);
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

$name = clean($_POST['name'] ?? '');
$organisation = clean($_POST['organisation'] ?? '');
$phone = clean($_POST['phone'] ?? '');
$email = trim($_POST['email'] ?? '');
$service = clean($_POST['service'] ?? '');
$fleet = clean($_POST['fleet'] ?? '');
$requirements = clean($_POST['requirements'] ?? '');

if ($name === '' || $organisation === '' || $phone === '' || $service === '' || $fleet === '' || $requirements === '' ||
    !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: index.html#contact', true, 303);
    exit;
}

$subject = 'New SS Transync Fleet Enquiry';
$body = "New fleet enquiry received from the website.\n\n"
      . "Name: {$name}\n"
      . "Organisation: {$organisation}\n"
      . "Phone: {$phone}\n"
      . "Email: {$email}\n"
      . "Service: {$service}\n"
      . "Fleet Size: {$fleet}\n\n"
      . "Route & Requirements:\n{$requirements}\n";

$headers = [
    'From: website@' . ($_SERVER['HTTP_HOST'] ?? 'sstransync.com'),
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8'
];

$sent = mail($recipient, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    header('Location: thank-you.html', true, 303);
} else {
    header('Location: contact-error.html', true, 303);
}
exit;
?>
