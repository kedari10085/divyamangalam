@echo off
cd /d "C:\Users\kedar\Downloads\DivyaMangalam"
echo =======================================================
echo Divya Mangalam Mahabharata Part 1 07:30 AM Publisher
echo =======================================================
python run_cloud_autonomous_pipeline.py --mode mahabharata_p1 >> logs_mahabharata_0730.log 2>&1
