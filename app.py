from flask import Flask, request, jsonify, send_file
import qrcode
import io

app = Flask(__name__)

@app.route('/')
def index():
    return send_file('templates/QrCode.html')

@app.route('/generate_qr', methods=['POST'])
def generate_qr():
    data = request.json
    url = data.get('url', '')
    
    # Generate QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill='black', back_color='white')

    # Save the image in a BytesIO object
    img_io = io.BytesIO()
    img.save(img_io, 'PNG')
    img_io.seek(0)

    return send_file(img_io, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
