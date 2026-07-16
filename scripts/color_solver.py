import math

def css_hue_rotate(r, g, b, degrees):
    # CSS filter hue-rotate matrix
    angle = degrees * math.pi / 180.0
    cosA = math.cos(angle)
    sinA = math.sin(angle)
    
    # These are the exact constants used by CSS filters (W3C Filter Effects Module Level 1)
    # The luminance weights are: 0.2126, 0.7152, 0.0722
    mat = [
        [0.213 + cosA*0.787 - sinA*0.213, 0.715 - cosA*0.715 - sinA*0.715, 0.072 - cosA*0.072 + sinA*0.928],
        [0.213 - cosA*0.213 + sinA*0.143, 0.715 + cosA*0.285 + sinA*0.140, 0.072 - cosA*0.072 - sinA*0.283],
        [0.213 - cosA*0.213 - sinA*0.787, 0.715 - cosA*0.715 + sinA*0.715, 0.072 + cosA*0.928 + sinA*0.072]
    ]
    
    nr = max(0, min(255, r*mat[0][0] + g*mat[0][1] + b*mat[0][2]))
    ng = max(0, min(255, r*mat[1][0] + g*mat[1][1] + b*mat[1][2]))
    nb = max(0, min(255, r*mat[2][0] + g*mat[2][1] + b*mat[2][2]))
    return nr, ng, nb

def invert(r, g, b):
    return 255 - r, 255 - g, 255 - b

# We want the final output to be around (255, 245, 235) - light warm tone.
# Output = hue_rotate(invert(input))
# So input = invert(hue_rotate_reverse(Output))
# Wait, hue_rotate(180) inverse is hue_rotate(-180)

r_out, g_out, b_out = 255, 245, 235
# Reverse hue-rotate by 180
hr, hg, hb = css_hue_rotate(r_out, g_out, b_out, -180)
# Reverse invert
ir, ig, ib = invert(hr, hg, hb)

print(f"To get {r_out},{g_out},{b_out}")
print(f"Input RGB: {ir:.1f}, {ig:.1f}, {ib:.1f}")
print(f"Hex: #{int(ir):02x}{int(ig):02x}{int(ib):02x}")
