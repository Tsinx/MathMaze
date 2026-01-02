import os
import time
from http import HTTPStatus
from urllib.parse import urlparse, unquote
from pathlib import PurePosixPath
import requests
import dashscope

dashscope.base_http_api_url = 'https://dashscope.aliyuncs.com/api/v1'
API_KEY = os.getenv('DASHSCOPE_API_KEY')
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'public', 'images', 'cells')

if not API_KEY:
    print('错误: 请设置环境变量 DASHSCOPE_API_KEY')
    exit(1)

os.makedirs(OUTPUT_DIR, exist_ok=True)

CELL_TYPES = [
    {
        'name': 'bacteria',
        'chinese_name': '细菌',
        'prompt': '''一只可爱的卡通拟人化细菌角色，适合4-6岁儿童观看。角色是圆润可爱的Q版人物形象，身体表面有光滑的曲线，点缀着小圆点装饰。角色穿着绿色的可爱外套，有明显的圆头和简单的手脚，表情调皮可爱，有一双明亮的大眼睛。角色站在画面中央，做出活泼可爱的动作。背景是纯天蓝色（#87CEEB），完全平坦无纹理，没有渐变，没有任何其他元素。整个画面风格是色彩鲜艳、线条简洁的儿童卡通插画风格。'''
    },
    {
        'name': 'white_blood_cell',
        'chinese_name': '白细胞',
        'prompt': '''一只英勇的卡通拟人化白细胞角色，适合4-6岁儿童观看。角色是守护者形象的Q版人物，全身呈现柔和的白色和浅蓝色色调。角色穿着类似超级英雄的白色铠甲，胸前有盾牌图案，表情正义勇敢，眼神坚定。角色站在画面中央，做出保护或战斗的姿势。背景是纯天蓝色（#87CEEB），完全平坦无纹理，没有渐变，没有任何其他元素。整个画面风格是色彩鲜艳、线条简洁的儿童卡通插画风格。'''
    },
    {
        'name': 'probiotics',
        'chinese_name': '益生菌',
        'prompt': '''一只友善的卡通拟人化益生菌角色，适合4-6岁儿童观看。角色是温暖友好的Q版人物形象，身体呈现柔和的粉色和浅紫色色调。角色穿着温馨的粉色小衣服，身体表面有柔和的波浪纹理，表情温和友善，有温暖的微笑，眼神慈祥。角色站在画面中央，做出友好的打招呼或拥抱姿势。背景是纯天蓝色（#87CEEB），完全平坦无纹理，没有渐变，没有任何其他元素。整个画面风格是色彩鲜艳、线条简洁的儿童卡通插画风格。'''
    }
]

def generate_image(cell_type: dict, max_retries: int = 3) -> bool:
    output_filename = f"{cell_type['name']}.png"
    output_path = os.path.join(OUTPUT_DIR, output_filename)
    
    print(f"\n{'='*60}")
    print(f"正在生成: {cell_type['chinese_name']} ({cell_type['name']})")
    print(f"{'='*60}")
    
    for attempt in range(max_retries):
        if attempt > 0:
            print(f"\n重试 {attempt + 1}/{max_retries}...")
            time.sleep(2 ** attempt)
        
        try:
            print("提交生成任务...")
            rsp = dashscope.ImageSynthesis.call(
                api_key=API_KEY,
                model="wanx-v2.6",
                prompt=cell_type['prompt'],
                n=1,
                size='1024*1024',
                prompt_extend=True,
                watermark=False
            )
            
            if rsp.status_code == HTTPStatus.OK:
                print(f"✓ 生成成功!")
                
                for result in rsp.output.results:
                    file_name = PurePosixPath(unquote(urlparse(result.url).path)).parts[-1]
                    image_response = requests.get(result.url)
                    
                    with open(output_path, 'wb+') as f:
                        f.write(image_response.content)
                    
                    print(f"✓ 图像已保存: {output_path}")
                    print(f"  文件大小: {len(image_response.content)} 字节")
                    print(f"  原始URL: {result.url}")
                    return True
            else:
                print(f"✗ 生成失败")
                print(f"  状态码: {rsp.status_code}")
                print(f"  错误码: {rsp.code}")
                print(f"  错误信息: {rsp.message}")
                
                if 'rate limit' in rsp.message.lower() and attempt < max_retries - 1:
                    wait_time = 2 ** (attempt + 1)
                    print(f"  频率限制，等待 {wait_time} 秒后重试...")
                    time.sleep(wait_time)
                    continue
                    
        except Exception as e:
            print(f"✗ 发生异常: {str(e)}")
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)
                continue
    
    return False

def main():
    print(f"\n{'='*60}")
    print(f"细胞卡通拟人图像生成工具")
    print(f"{'='*60}")
    print(f"输出目录: {OUTPUT_DIR}")
    print(f"使用模型: wanx-v2.6 (通义万相2.6)")
    print(f"图像尺寸: 1024*1024")
    print(f"背景颜色: 纯天蓝色 (#87CEEB) - 便于抠图")
    print(f"目标年龄: 4-6岁儿童")
    print(f"{'='*60}")
    
    success_count = 0
    failed_types = []
    
    for cell_type in CELL_TYPES:
        if generate_image(cell_type):
            success_count += 1
        else:
            failed_types.append(cell_type['chinese_name'])
    
    print(f"\n{'='*60}")
    print(f"生成完成!")
    print(f"{'='*60}")
    print(f"成功: {success_count}/{len(CELL_TYPES)}")
    
    if success_count == len(CELL_TYPES):
        print(f"✓ 所有细胞图像生成成功!")
        print(f"输出目录: {OUTPUT_DIR}")
    else:
        print(f"✗ 以下细胞生成失败: {', '.join(failed_types)}")

if __name__ == '__main__':
    main()
