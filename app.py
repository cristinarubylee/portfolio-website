from flask import Flask, render_template, request, flash, redirect
# from flask_mail import Mail, Message
from dotenv import load_dotenv
import os, requests

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY")

# Flask-Mail config
# app.config['MAIL_SERVER'] = os.getenv("MAIL_SERVER")
# app.config['MAIL_PORT'] = int(os.getenv("MAIL_PORT"))
# app.config['MAIL_USE_TLS'] = os.getenv("MAIL_USE_TLS") == "True"
# app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME")
# app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")

# mail = Mail(app)
RECAPTCHA_SECRET = os.getenv("CAPTCHA_SECRET_KEY")

@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        # Verify reCAPTCHA
        captcha_response = request.form.get("g-recaptcha-response")
        verify_url = "https://www.google.com/recaptcha/api/siteverify"
        payload = {
            "secret": RECAPTCHA_SECRET,
            "response": captcha_response
        }
        captcha_verify = requests.post(verify_url, data=payload).json()
        if not captcha_verify.get("success"):
            flash("reCAPTCHA verification failed. Please try again.")
            return redirect("/contact")

        # Form data
        name = request.form["name"]
        email = request.form["email"]
        message = request.form["message"]

        # Send email
        msg = Message(
            subject=f"New Contact Form Submission from {name}",
            sender=app.config['MAIL_USERNAME'],
            recipients=[app.config['MAIL_USERNAME']],  # send to yourself
            body=f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
        )
        mail.send(msg)
        flash("Message sent successfully!")
        return redirect("/contact")