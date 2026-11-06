import os
import sys
import cv2
import numpy as np

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

base_dir = r"C:\Users\kedar\Downloads\DivyaMangalam\images\ayyappa_swamiye_saranam_scenes"
target_w = 1376
target_h = 768

def crop_and_fit_16_9(img, crop_center_y=0.5, crop_center_x=0.5):
    h, w = img.shape[:2]
    target_aspect = target_w / target_h  # ~1.7916
    current_aspect = w / h
    
    if current_aspect > target_aspect:
        # Image is wider than 16:9 -> crop sides
        new_w = int(h * target_aspect)
        start_x = int((w - new_w) * crop_center_x)
        cropped = img[:, start_x:start_x + new_w]
    else:
        # Image is taller than 16:9 -> crop top/bottom
        new_h = int(w / target_aspect)
        start_y = int((h - new_h) * crop_center_y)
        cropped = img[start_y:start_y + new_h, :]
        
    scaled = cv2.resize(cropped, (target_w, target_h), interpolation=cv2.INTER_LANCZOS4)
    return scaled

def apply_oil_painting_finish(img, warmth=1.1, saturation=1.15):
    # 1. Edge-preserving smoothing for brushstroke texture
    smooth = cv2.edgePreservingFilter(img, flags=1, sigma_s=50, sigma_r=0.35)
    # 2. Detail enhancement
    detail = cv2.detailEnhance(smooth, sigma_s=10, sigma_r=0.15)
    
    # 3. Warm golden devotional color grading
    hsv = cv2.cvtColor(detail, cv2.COLOR_BGR2HSV).astype(np.float32)
    hsv[:, :, 1] = np.clip(hsv[:, :, 1] * saturation, 0, 255) # Increase color vibrancy
    detail_vibrant = cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2BGR).astype(np.float32)
    
    # Warm golden tone bias: slightly boost Red and Green channels
    detail_vibrant[:, :, 2] = np.clip(detail_vibrant[:, :, 2] * warmth, 0, 255)      # Red
    detail_vibrant[:, :, 1] = np.clip(detail_vibrant[:, :, 1] * (warmth * 0.98), 0, 255) # Green
    
    # Subtle blend with original for sharp features
    final = cv2.addWeighted(img, 0.25, detail_vibrant.astype(np.uint8), 0.75, 0)
    return final

print("Processing Ayyappa Scenes to 16:9 Classical Oil Painting Masterpieces...")

# Act 1, 2, 3 are already generated widescreen oil paintings:
# Just verify they are 1376x768
for act_num, name in [(1, "act_1_ayyappa_murugan_darshan.jpg"),
                      (2, "act_2_manikandan_pulivahanam.jpg"),
                      (3, "act_3_slaying_mahishi.jpg")]:
    p = os.path.join(base_dir, name)
    img = cv2.imread(p)
    if img.shape[1] != target_w or img.shape[0] != target_h:
        resized = cv2.resize(img, (target_w, target_h), interpolation=cv2.INTER_LANCZOS4)
        cv2.imwrite(p, resized)
    print(f"✅ Act {act_num} ready: {name} -> (768, 1376)")

# Act 4: Devotees trekking with Irumudi through misty forest
raw_p = os.path.join(base_dir, "raw_pilgrims_forest.jpg")
img_pilgrims = cv2.imread(raw_p)
act4_fitted = crop_and_fit_16_9(img_pilgrims, crop_center_y=0.45)
act4_oil = apply_oil_painting_finish(act4_fitted, warmth=1.08, saturation=1.2)
cv2.imwrite(os.path.join(base_dir, "act_4_irumudi_forest_pilgrimage.jpg"), act4_oil)
print("✅ Act 4 ready: act_4_irumudi_forest_pilgrimage.jpg")

# Act 5: Divine infant Manikandan found at River Pampa by King Rajashekhara
raw_p = os.path.join(base_dir, "raw_ayyappa_pampa.jpg")
img_pampa = cv2.imread(raw_p)
act5_fitted = crop_and_fit_16_9(img_pampa, crop_center_y=0.5)
act5_oil = apply_oil_painting_finish(act5_fitted, warmth=1.12, saturation=1.2)
cv2.imwrite(os.path.join(base_dir, "act_5_pampa_manikandan_found.jpg"), act5_oil)
print("✅ Act 5 ready: act_5_pampa_manikandan_found.jpg")

# Act 6: Sacred 18 Golden Steps (Pathinettampadi)
raw_p = os.path.join(base_dir, "raw_18_steps.jpg")
img_steps = cv2.imread(raw_p)
act6_fitted = crop_and_fit_16_9(img_steps, crop_center_y=0.6)
act6_oil = apply_oil_painting_finish(act6_fitted, warmth=1.18, saturation=1.25) # Extra golden glow for Panchaloha
cv2.imwrite(os.path.join(base_dir, "act_6_pathinettampadi_18_steps.jpg"), act6_oil)
print("✅ Act 6 ready: act_6_pathinettampadi_18_steps.jpg")

# Act 7: Supreme Golden Darshan of Lord Ayyappa (Chin-Mudra & Peedam)
raw_p = os.path.join(base_dir, "raw_ayyappa_darshan.jpg")
img_darshan = cv2.imread(raw_p)
act7_fitted = crop_and_fit_16_9(img_darshan, crop_center_y=0.4)
act7_oil = apply_oil_painting_finish(act7_fitted, warmth=1.15, saturation=1.2)
cv2.imwrite(os.path.join(base_dir, "act_7_lord_ayyappa_sannidhanam_darshan.jpg"), act7_oil)
print("✅ Act 7 ready: act_7_lord_ayyappa_sannidhanam_darshan.jpg")

# Act 8: Golden Temple Sannidhanam & Celestial Makara Jyothi
raw_p = os.path.join(base_dir, "raw_sannidhanam_gold_roof.jpg")
img_roof = cv2.imread(raw_p)
act8_fitted = crop_and_fit_16_9(img_roof, crop_center_y=0.35)
act8_oil = apply_oil_painting_finish(act8_fitted, warmth=1.10, saturation=1.15)
cv2.imwrite(os.path.join(base_dir, "act_8_makara_jyothi_harivarasanam.jpg"), act8_oil)
print("✅ Act 8 ready: act_8_makara_jyothi_harivarasanam.jpg")

print("\n🎉 ALL 8 SCENES PREPARED SUCCESSFULLY!")
