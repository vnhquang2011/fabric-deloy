<!DOCTYPE HTML>
<html lang="en-US">

<head>
	<meta charset="UTF-8">
	<title>Kênh tra cứu Milkcomp1</title>
	<link rel="stylesheet" href="css/font-awesome/css/font-awesome.min.css" />
	<link href='https://fonts.googleapis.com/css?family=Merriweather:400,300,700,300italic' rel='stylesheet'
		type='text/css'>
	<link rel="stylesheet" href="css/bootstrap/bootstrap.min.css" />
	<link rel="stylesheet" href="css/animat/animate.min.css" />
	<link rel="stylesheet" href="css/fancybox/jquery.fancybox.css" />
	<link rel="stylesheet" href="css/nivo-lightbox/nivo-lightbox.css" />
	<link rel="stylesheet" href="css/themes/default/default.css" />
	<link rel="stylesheet" href="css/owl-carousel/owl.carousel.css" />
	<link rel="stylesheet" href="css/owl-carousel/owl.theme.css" />
	<link rel="stylesheet" href="css/owl-carousel/owl.transitions.css">

	<link rel="stylesheet" href="css/style.css" />
	<link rel="stylesheet" href="css/responsive.css" />
</head>
<?php 
	error_reporting(0);
	$id = $_GET['id'];
	$curl = curl_init();
	curl_setopt_array($curl, array(
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_URL => 'localhost:3004/api/Unit/'.$id,
		CURLOPT_USERAGENT => 'Test cURL GET Request',
		CURLOPT_SSL_VERIFYPEER => false
	));	
	$resp = curl_exec($curl);
	$val_arr = json_decode($resp, true);
	curl_close($curl);
?>

<body>
	<div class='preloader'>
		<div class='loaded'>&nbsp;</div>
	</div>
	<header id="home" class="header">
		<div class="main_menu_bg navbar-fixed-top wow slideInDown" data-wow-duration="1s">
			<div class="container">
				<div class="row">
					<div class="nave_menu">
						<nav class="navbar navbar-default">
							<div class="container-fluid">
								<!-- Brand and toggle get grouped for better mobile display -->
								<div class="navbar-header">
									<button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
										data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
										<span class="sr-only">Toggle navigation</span>
										<span class="icon-bar"></span>
										<span class="icon-bar"></span>
										<span class="icon-bar"></span>
									</button>

								</div>

								<!-- Collect the nav links, forms, and other content for toggling -->
								<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

									<ul class="nav navbar-nav navbar-right">
										<li class="active"><a href="#home">Trang chủ</a></li>
										<li><a href="#abouts">Tra cứu</a></li>
										<li><a href="#features">Thành viên</a></li>
										<li><a href="#footer">Về chúng tôi</a></li>
									</ul>
								</div><!-- /.navbar-collapse -->
							</div><!-- /.container-fluid -->
						</nav>
					</div>
				</div>
				<!--End of row -->

			</div>
			<!--End of container -->

		</div>
	</header>
	<!--End of header -->

	<section id="banner" class="banner">
		<div class="container">
			<div class="row">
				<div class="main_banner_area text-center">
					<div class="col-md-8 col-sm-8 col-md-offset-4 col-sm-offset-5">
						<div class="single_banner_text wow zoomIn" data-wow-duration="1s">
							<p>Kính chào quý khách</p>
							<div class="separetor"></div>
						</div>
					</div>
					<div class="scrolldown">
						<a href="#abouts" class="scroll_btn"></a>
					</div>
				</div>


			</div>
		</div>
	</section><!-- End of Banner Section -->

	<section id="abouts" class="abouts sections">
		<div class="container">
			<div class="row">
				<div class="main_abouts">
					<div class="col-md-8 col-sm-9 col-xs-12">
						<div class="single_abouts wow slideInLeft" data-wow-duration="2s">
							<div class="head_title text-center">
								<h2 style="color:black;">Tra cứu thông tin</h2>
								<div class="separetor"></div>
								<?php 
									if ($val_arr['unitName'] != NULL) 
									{
								?>
								<div class="info-table">
									<div class="row-info">
										<div class="key-info col-sm-4 col-md-4 col-xs-4">Tên sản phẩm</div>
										<div class="val-info col-md-8 col-sm-8 col-xs-8">
											<?php echo $val_arr['unitName'] ?>
										</div>
									</div>
									<div class="row-info">
										<div class="key-info col-sm-4 col-md-4 col-xs-4">Mã sản phẩm</div>
										<div class="val-info col-md-8 col-sm-8 col-xs-8">
											<?php echo $val_arr['unitId']; ?>
										</div>
									</div>
									<div class="row-info">
										<div class="key-info col-sm-4 col-md-4 col-xs-4">Tình trạng</div>
										<div class="val-info col-md-8 col-sm-8 col-xs-8">
											<?php 
												if ($val_arr['uStatus'] == "SOLD")
													echo "Sản phẩm đã được bán";
												else 
													echo "Đang được bày bán";
											?>
										</div>
									</div>
									<div class="row-info">
										<div class="key-info col-sm-4 col-md-4 col-xs-4">Đặc điểm</div>
										<div class="val-info col-md-8 col-sm-8 col-xs-8 unit-description">
											<?php echo $val_arr['description'] ?>
										</div>
									</div>
									<div class="row-info">
										<div class="key-info col-sm-4 col-md-4 col-xs-4">Ngày lên kệ</div>
										<div class="val-info col-md-8 col-sm-8 col-xs-8">
											<?php echo date('d/m/Y H:i:s',strtotime($val_arr['sellingDate'])); ?>
										</div>
									</div>
									<div class="row-info">
										<div class="key-info col-sm-4 col-md-4 col-xs-4">Ngày bán</div>
										<div class="val-info col-md-8 col-sm-8 col-xs-8">
											<?php  
												if (date('d/m/Y H:i:s',strtotime($val_arr['soldDate'])) < date('d/m/Y H:i:s',strtotime($val_arr['sellingDate'])))
													echo "";
												else 
												 	echo date('d/m/Y H:i:s',strtotime($val_arr['sellingDate']));
											?>
										</div>
									</div>
									<div class="row-info">
										<div class="key-info col-sm-4 col-md-4 col-xs-4"><?php if($val_arr['uStatus'] == "SELLING") echo "Đang được bán tại"; else echo "Nơi bán"; ?></div>
										<div class="val-info col-md-8 col-sm-8 col-xs-8">
											<?php 
												$ownerid = explode('#',$val_arr['owner'],2)[1];
												$curl = curl_init();
												curl_setopt_array($curl, array(
													CURLOPT_RETURNTRANSFER => true,
													CURLOPT_URL => 'localhost:3004/api/Trader/'.$ownerid,
													CURLOPT_USERAGENT => 'cURL GET Request',
													CURLOPT_SSL_VERIFYPEER => false
												));	
												$resp = curl_exec($curl);
												$val = json_decode($resp, true);
												curl_close($curl);
												echo $val['name'];
											?>
										</div>
									</div>
								</div>
								<?php 
									}
									else
									{
								?>
									<div class="info-table" style="text-alige:center;"> <Span>Không tìm thấy sản phẩm! <br>Nếu bạn nghi ngờ hàng giả, hãy liên hệ với chúng tôi bằng số điện thoại cuối trang, cảm ơn!</Span></div>
								<?php 
									}
								?>
							</div>
						</div>
					</div>

					<div class="col-md-4 col-sm-3 col-xs-12">
						<div class="single_abouts wow slideInRight" data-wow-duration="2s">
							<img src="images/s.png" alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</section><!-- End of Abouts Section -->

	<section id="features" class="features sections">
		<div class="container">
			<div class="row">
				<div class="features_content text-center">
					<h2 style="color:black;">Thành viên</h2>
					<div class="separetor"></div>
					<div class="col-md-4">
						<div class="sinle_features wow slideInUp" data-wow-duration="1s">
							<img src="images/icon1.png" alt="" />
							<h5 style="color:black;"><?php 
								$curl = curl_init();
								curl_setopt_array($curl, array(
									CURLOPT_RETURNTRANSFER => true,
									CURLOPT_URL => 'http://localhost:3004/api/MilkCompany',
									CURLOPT_USERAGENT => 'cURL GET Request',
									CURLOPT_SSL_VERIFYPEER => false
								));	
								$resp = curl_exec($curl);
								$val = json_decode($resp, true);
								curl_close($curl);
								echo $val[0]['name'];
							?></h5>
						</div>
					</div>
					<div class="col-md-4">
						<div class="sinle_features wow slideInUp" data-wow-duration="1.5s">
							<img src="images/icon2.png" alt="" />
							<h5 style="color:black;"><?php 
								$curl = curl_init();
								curl_setopt_array($curl, array(
									CURLOPT_RETURNTRANSFER => true,
									CURLOPT_URL => 'localhost:3004/api/TransportCompany',
									CURLOPT_USERAGENT => 'cURL GET Request',
									CURLOPT_SSL_VERIFYPEER => false
								));	
								$resp = curl_exec($curl);
								$val = json_decode($resp, true);
								curl_close($curl);
								echo $val[0]['name'];
							?></h5>
						</div>
					</div>
					<div class="col-md-4">
						<div class="sinle_features wow slideInUp" data-wow-duration="2s">
							<img src="images/icon3.png" alt="" />
							<h5 style="color:black;"><?php 
								$curl = curl_init();
								curl_setopt_array($curl, array(
									CURLOPT_RETURNTRANSFER => true,
									CURLOPT_URL => 'localhost:3004/api/Trader',
									CURLOPT_USERAGENT => 'cURL GET Request',
									CURLOPT_SSL_VERIFYPEER => false
								));	
								$resp = curl_exec($curl);
								$val = json_decode($resp, true);
								curl_close($curl);
								echo $val[0]['name'];
							?></h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section><!-- End of Abouts Section -->

	<!-- footer Section -->
	<footer id="footer" class="footer">
		<div class="container">
			<div class="row">
				<div class="col-sm-6 col-xs-10">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.504512211595!2d106.65552001378587!3d10.7726179923241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec3c161a3fb%3A0xef77cd47a1cc691e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBCw6FjaCBraG9hIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1558786452677!5m2!1svi!2s"
						width="100%" height="300" frameborder="0" style="border:0" allowfullscreen>
					</iframe>
				</div>

				<div class="col-sm-6 col-xs-10">
					<div class="contact_area wow slideInLeft" data-wow-duration="2s">
						<div class="head_title text-center">
							<h2>Về chúng tôi</h2>
							<div class="separetor"></div>
						</div>

						<div class="main_contact_content">
							<div class="row">
								<?php 
								$curl = curl_init();
								curl_setopt_array($curl, array(
									CURLOPT_RETURNTRANSFER => true,
									CURLOPT_URL => 'http://localhost:3004/api/MilkCompany',
									CURLOPT_USERAGENT => 'cURL GET Request',
									CURLOPT_SSL_VERIFYPEER => false
								));	
								$resp = curl_exec($curl);
								$val = json_decode($resp, true);
								curl_close($curl);
							?>
								<div class="col-sm-6">
									<div class="single_contact text-left">
										<h5>Địa chỉ :</h5>
										<span><?php echo $val[0]['country'];?></span>
									</div>
								</div>

								<div class="col-sm-6">
									<div class="single_contact text-left">
										<h5>Liên hệ :</h5>
										<span>Phone: &nbsp; <?php echo $val[0]['phone'];?></span>
										<span>Email: &nbsp; <?php echo $val[0]['email'];?></span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>


			<div class="row">
				<div class="copyright_text_area">
					<div class="col-md-6 col-sm-6 col-xs-12">
						<div class="single_footer text-right wow zoomIn" data-wow-duration="2s">
							<p><i class="fa fa-heart"></i> Made by Võ Nhật Hồng Quang </p>
						</div>
					</div>
					<div class="col-md-6 col-sm-6 col-xs-12">
						<div class="single_footer text-right">

							<div class="footer_socail wow zoomIn" data-wow-duration="1.5s">
								<a href=""><i class="fa fa-facebook"></i></a>
								<a href=""><i class="fa fa-linkedin"></i></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</footer>

	<!-- STRAT SCROLL TO TOP -->
	<div class="scrollup">
		<a href="#"><i class="fa fa-chevron-up"></i></a>
	</div>
	<script type="text/javascript" src="js/jquery/jquery.js"></script>
	<script type="text/javascript" src="js/script.js"></script>
	<script type="text/javascript" src="js/bootstrap/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/fancybox/jquery.fancybox.pack.js"></script>
	<script type="text/javascript" src="js/nivo-lightbox/nivo-lightbox.min.js"></script>
	<script type="text/javascript" src="js/owl-carousel/owl.carousel.min.js"></script>
	<script type="text/javascript" src="js/jquery-easing/jquery.easing.1.3.js"></script>
	<script type="text/javascript" src="js/wow/wow.min.js"></script>
</body>

</html>