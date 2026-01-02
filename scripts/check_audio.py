
import os

# Define the directory
audio_dir = r"D:\Projects\MathMaze\public\audio\intro"
constants_file = r"D:\Projects\MathMaze\src\utils\constants.ts"

# Get files in directory
files = os.listdir(audio_dir)
wav_files = {f.lower().replace('.wav', ''): f for f in files if f.endswith('.wav')}

# Extract IDs from constants.ts
ids = []
with open(constants_file, 'r', encoding='utf-8') as f:
    for line in f:
        if "id: '" in line:
            # simple extraction
            part = line.split("id: '")[1]
            id_val = part.split("'")[0]
            ids.append(id_val)

print(f"Found {len(ids)} IDs in constants.ts")
print(f"Found {len(wav_files)} WAV files in {audio_dir}")

missing = []
for i in ids:
    # Skip immune cells and probiotics if they are in the same list but files are elsewhere?
    # Constants has LEVELS, ORGANS, IMMUNE_CELLS, PROBIOTICS, PATHOGENS.
    # Intro audio is mainly for PATHOGENS (enemies) and ALLIES (immune/probiotics).
    
    # We should check if the file exists for the ID.
    if i not in wav_files:
        # Check if it's a pathogen (usually have intro)
        missing.append(i)

print("\nIDs without corresponding .wav file in public/audio/intro:")
for m in missing:
    print(m)

print("\nFiles in public/audio/intro without corresponding ID (potential junk):")
for f in wav_files:
    if f not in ids:
        print(f"{f} (File: {wav_files[f]})")
